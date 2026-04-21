import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { runInfluencerDiscoveryPipeline } from '@/lib/influencers/pipeline';

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const { keywords, maxResults = 5 } = await request.json();

    if (!keywords || !keywords.length) {
      return NextResponse.json({ error: 'Keywords are required' }, { status: 400 });
    }

    // Call the SMART pipeline (Serper + Apify)
    const influencers = await runInfluencerDiscoveryPipeline(keywords, maxResults);

    // Filter and map to what we want to save
    const inserts = influencers.map(inf => ({
      user_id: user.id,
      handle: inf.username,
      platform: 'Instagram',
      followers: inf.followersCount ?? 0,
      engagement_rate: 0, // Would need more sophisticated calculation or another endpoint
      niche: keywords.slice(0, 3),
      pricing_estimate: null,
      notes: inf.biography ? inf.biography.slice(0, 500) : '',
      contact_info: inf.businessEmail || null,
      status: 'discovered'
    }));

    if (inserts.length > 0) {
      await supabase.from('influencers').insert(inserts);
    }

    return NextResponse.json({ success: true, data: influencers });
  } catch (error) {
    console.error('Apify discover error:', error);
    return NextResponse.json({ error: 'Failed to discover influencers' }, { status: 500 });
  }
}
