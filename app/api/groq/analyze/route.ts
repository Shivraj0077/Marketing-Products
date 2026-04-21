import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { callGroq } from '@/lib/groq/client';
import { serperSearch } from '@/lib/serper/client';
import { ANALYSIS_SYSTEM_PROMPT, buildAnalysisPrompt } from '@/lib/prompts/analysis';

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const { productId } = await request.json();
    if (!productId) return NextResponse.json({ error: 'productId required' }, { status: 400 });

    // Fetch the product
    const { data: product, error: productError } = await supabase
      .from('products')
      .select('*')
      .eq('id', productId)
      .eq('user_id', user.id)
      .single();

    if (productError || !product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    // Step 1: Serper competitor search
    let competitorContext = 'No competitor data found.';
    try {
      const serperData = await serperSearch(
        `${product.name} competitors alternatives India D2C brand`,
        8
      );
      if (serperData.organic?.length) {
        competitorContext = serperData.organic
          .slice(0, 6)
          .map((r: { title: string; snippet: string; link: string }) =>
            `• ${r.title}: ${r.snippet} (${r.link})`
          )
          .join('\n');
      }
    } catch (e) {
      console.error('Serper error:', e);
    }

    // Step 2: Serper market trends
    let trendContext = '';
    try {
      const trendData = await serperSearch(
        `${product.name} market trends India 2025 D2C`,
        5
      );
      if (trendData.organic?.length) {
        trendContext = trendData.organic
          .slice(0, 3)
          .map((r: { title: string; snippet: string }) => `• ${r.title}: ${r.snippet}`)
          .join('\n');
      }
    } catch (e) {
      console.error('Serper trends error:', e);
    }

    // Step 3: LLaMA analysis
    const fullContext = `Product: ${product.name}\nDescription: ${product.description}\nURL: ${product.url ?? 'N/A'}\n\nCompetitor Data:\n${competitorContext}\n\nMarket Trends:\n${trendContext}`;

    const rawAnalysis = await callGroq(
      ANALYSIS_SYSTEM_PROMPT,
      buildAnalysisPrompt(
        `${product.name}\n${product.description}`,
        competitorContext
      ),
      { parseJson: true, maxTokens: 4096 }
    );

    let analysis: Record<string, unknown>;
    try {
      analysis = JSON.parse(rawAnalysis);
    } catch {
      return NextResponse.json({ error: 'AI returned invalid JSON' }, { status: 500 });
    }

    // Step 4: Store results in Supabase
    // Clear old data for this product
    await Promise.all([
      supabase.from('usps').delete().eq('product_id', productId),
      supabase.from('competitors').delete().eq('product_id', productId),
      supabase.from('buyer_personas').delete().eq('product_id', productId),
      supabase.from('marketing_strategies').delete().eq('product_id', productId),
    ]);

    // Insert USPs
    const usps = (analysis.usps as Array<{ usp_text: string; confidence_score: number }>) ?? [];
    if (usps.length > 0) {
      await supabase.from('usps').insert(
        usps.map(u => ({
          product_id: productId,
          usp_text: u.usp_text,
          confidence_score: u.confidence_score ?? 0.7,
        }))
      );
    }

    // Insert Competitors from Serper + AI
    const aiCompetitors: Array<{ name: string; positioning?: string }> =
      (analysis.competitors as Array<{ name: string; positioning?: string }>) ?? [];

    // Parse Serper results into competitor format
    const serperCompetitors = competitorContext
      .split('\n')
      .filter(l => l.startsWith('•'))
      .slice(0, 5)
      .map(l => {
        const [title, ...rest] = l.replace('• ', '').split(':');
        return { name: title.trim(), positioning: rest.join(':').trim().slice(0, 200) };
      });

    const competitorsToInsert = [
      ...serperCompetitors,
      ...aiCompetitors.filter(
        ac => !serperCompetitors.some(sc => sc.name.toLowerCase().includes(ac.name?.toLowerCase()))
      ),
    ].slice(0, 7);

    if (competitorsToInsert.length > 0) {
      await supabase.from('competitors').insert(
        competitorsToInsert.map(c => ({
          product_id: productId,
          name: c.name,
          positioning: c.positioning ?? '',
        }))
      );
    }

    // Insert Buyer Personas
    const personas = (analysis.buyer_personas as Array<Record<string, unknown>>) ?? [];
    if (personas.length > 0) {
      await supabase.from('buyer_personas').insert(
        personas.map(p => ({
          product_id: productId,
          name: (p.name as string) ?? 'Unnamed Persona',
          demographics: p.demographics ?? {},
          psychographics: p.psychographics ?? {},
          behavior: p.behavior ?? {},
        }))
      );
    }

    // Store strategy doc
    const strategyDoc = {
      executive_summary: `AI-generated strategy for ${product.name} based on market analysis.`,
      brand_voice: analysis.brand_voice ?? {},
      positioning_statement: (analysis.target_audience as Record<string, unknown>)?.primary ?? '',
      campaign_ideas: analysis.campaign_ideas ?? [],
      recommended_channels: analysis.recommended_channels ?? [],
      market_trends: trendContext,
      competitor_context: competitorContext,
    };

    await supabase.from('marketing_strategies').insert({
      product_id: productId,
      strategy_doc: strategyDoc,
      channels: ((analysis.recommended_channels as Array<{ channel: string }>) ?? []).map(c => c.channel),
      budget_split: analysis.budget_split ?? {},
      kpis: analysis.kpis ?? [],
      roadmap: {
        day30: analysis.roadmap ? (analysis.roadmap as Record<string, unknown>).day30 : [],
        day60: analysis.roadmap ? (analysis.roadmap as Record<string, unknown>).day60 : [],
        day90: analysis.roadmap ? (analysis.roadmap as Record<string, unknown>).day90 : [],
      },
    });

    // Update product status to analyzed
    await supabase
      .from('products')
      .update({ status: 'analyzed' })
      .eq('id', productId);

    return NextResponse.json({
      success: true,
      data: { analysis, competitorContext, trendContext },
    });
  } catch (error) {
    console.error('Analyze error:', error);
    return NextResponse.json(
      { error: 'Analysis failed. Please try again.' },
      { status: 500 }
    );
  }
}
