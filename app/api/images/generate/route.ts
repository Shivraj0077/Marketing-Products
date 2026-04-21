import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { generateImageUrl } from '@/lib/pollinations';

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const { prompt, productId, width, height } = await request.json();
    if (!prompt) return NextResponse.json({ error: 'prompt required' }, { status: 400 });

    const imageUrl = generateImageUrl(prompt, { width, height });

    // Store in Supabase
    await supabase.from('generated_images').insert({
      user_id: user.id,
      product_id: productId ?? null,
      prompt,
      image_url: imageUrl,
    });

    // Update usage metrics
    await supabase.rpc('increment_usage', {
      p_user_id: user.id,
      p_field: 'images_generated',
    }).maybeSingle();

    return NextResponse.json({ success: true, data: { image_url: imageUrl, prompt } });
  } catch (error) {
    console.error('Image generation error:', error);
    return NextResponse.json({ error: 'Image generation failed' }, { status: 500 });
  }
}
