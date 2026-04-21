import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { callGroq } from '@/lib/groq/client';
import { NEGOTIATION_SYSTEM_PROMPT, buildSimulationPrompt } from '@/lib/prompts/negotiation';

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const { influencerName, followers, niche, ourBudget, campaignGoal, history } = await request.json();

    if (!influencerName || !ourBudget) {
      return NextResponse.json({ error: 'Missing required parameters' }, { status: 400 });
    }

    // Pass the message history if it exists, otherwise generate the first turn
    const prompt = buildSimulationPrompt(
      influencerName, 
      followers, 
      niche, 
      ourBudget, 
      campaignGoal,
      history
    );

    const rawMsg = await callGroq(NEGOTIATION_SYSTEM_PROMPT, prompt, { parseJson: true });
    const responseData = JSON.parse(rawMsg);

    return NextResponse.json({ success: true, data: responseData });
  } catch (error) {
    console.error('Negotiation generation error:', error);
    return NextResponse.json({ error: 'Failed to simulate negotiation step' }, { status: 500 });
  }
}
