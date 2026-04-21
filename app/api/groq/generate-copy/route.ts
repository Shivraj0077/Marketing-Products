import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { callGroq } from '@/lib/groq/client';
import { COPYWRITING_SYSTEM_PROMPT, buildEmailCopyPrompt, buildSocialCopyPrompt } from '@/lib/prompts/copywriting';

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const { productId, type, campaignGoal, platform, tone } = await request.json();

    // Fetch product data
    const [productRes, uspsRes, personasRes] = await Promise.all([
      supabase.from('products').select('*').eq('id', productId).single(),
      supabase.from('usps').select('*').eq('product_id', productId).limit(1),
      supabase.from('buyer_personas').select('*').eq('product_id', productId).limit(1),
    ]);

    if (!productRes.data) return NextResponse.json({ error: 'Product not found' }, { status: 404 });

    const product = productRes.data;
    const topUsp = uspsRes.data?.[0]?.usp_text ?? 'High-quality product';
    const persona = personasRes.data?.[0]?.name ?? 'Target customer';

    let prompt: string;
    if (type === 'email') {
      prompt = buildEmailCopyPrompt(product.name, topUsp, persona, campaignGoal ?? 'drive sales');
    } else {
      prompt = buildSocialCopyPrompt(product.name, product.description ?? '', platform ?? 'Instagram', tone ?? 'energetic');
    }

    const raw = await callGroq(COPYWRITING_SYSTEM_PROMPT, prompt, { parseJson: true, maxTokens: 3000 });
    const copy = JSON.parse(raw);

    return NextResponse.json({ success: true, data: copy });
  } catch (error) {
    console.error('Copy generation error:', error);
    return NextResponse.json({ error: 'Copy generation failed' }, { status: 500 });
  }
}
