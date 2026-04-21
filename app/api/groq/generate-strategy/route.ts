import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { callGroq } from '@/lib/groq/client';
import { STRATEGY_SYSTEM_PROMPT, buildStrategyPrompt } from '@/lib/prompts/strategy';

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const { productId } = await request.json();
    if (!productId) return NextResponse.json({ error: 'productId required' }, { status: 400 });

    // Fetch product + its analysis data
    const [productRes, uspsRes, personasRes, competitorsRes] = await Promise.all([
      supabase.from('products').select('*').eq('id', productId).eq('user_id', user.id).single(),
      supabase.from('usps').select('*').eq('product_id', productId),
      supabase.from('buyer_personas').select('*').eq('product_id', productId),
      supabase.from('competitors').select('*').eq('product_id', productId),
    ]);

    if (productRes.error || !productRes.data) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    const product = productRes.data;
    const usps = uspsRes.data ?? [];
    const personas = personasRes.data ?? [];
    const competitors = competitorsRes.data ?? [];

    // Build contextual prompt
    const uspTexts = usps.map(u => u.usp_text);
    const personaSummary = personas
      .map(p => `${p.name}: ${JSON.stringify(p.demographics)}`)
      .join('; ');
    const competitorNames = competitors.map(c => c.name).join(', ');

    const rawStrategy = await callGroq(
      STRATEGY_SYSTEM_PROMPT,
      buildStrategyPrompt(
        product.name,
        uspTexts,
        personaSummary,
        competitorNames,
        ['Instagram', 'Email', 'Influencer Marketing']
      ),
      { parseJson: true, maxTokens: 4096 }
    );

    let strategyData: Record<string, unknown>;
    try {
      strategyData = JSON.parse(rawStrategy);
    } catch {
      return NextResponse.json({ error: 'AI returned invalid JSON' }, { status: 500 });
    }

    // Update the marketing_strategies row
    const { data: existingStrategy } = await supabase
      .from('marketing_strategies')
      .select('id')
      .eq('product_id', productId)
      .single();

    if (existingStrategy) {
      await supabase
        .from('marketing_strategies')
        .update({
          strategy_doc: {
            executive_summary: strategyData.executive_summary,
            positioning_statement: strategyData.positioning_statement,
            brand_voice: strategyData.brand_voice,
            campaign_ideas: [],
            content_calendar: strategyData.content_calendar ?? {},
            success_metrics: strategyData.success_metrics ?? {},
          },
          roadmap: {
            day30: (strategyData.phase1 as Record<string, unknown>)?.tactics ?? [],
            day60: (strategyData.phase2 as Record<string, unknown>)?.tactics ?? [],
            day90: (strategyData.phase3 as Record<string, unknown>)?.tactics ?? [],
          },
        })
        .eq('id', existingStrategy.id);
    } else {
      await supabase.from('marketing_strategies').insert({
        product_id: productId,
        strategy_doc: strategyData,
        channels: ['Instagram', 'Email', 'Influencer Marketing'],
        budget_split: {},
        kpis: [],
        roadmap: {
          day30: (strategyData.phase1 as Record<string, unknown>)?.tactics ?? [],
          day60: (strategyData.phase2 as Record<string, unknown>)?.tactics ?? [],
          day90: (strategyData.phase3 as Record<string, unknown>)?.tactics ?? [],
        },
      });
    }

    return NextResponse.json({ success: true, data: strategyData });
  } catch (error) {
    console.error('Strategy error:', error);
    return NextResponse.json({ error: 'Strategy generation failed' }, { status: 500 });
  }
}
