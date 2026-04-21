import { NextRequest, NextResponse } from 'next/server';
import { callGroq } from '@/lib/groq/client';

export async function POST(request: NextRequest) {
  try {
    const { data } = await request.json();

    const prompt = `You are a Senior Marketing Data Analyst. Look at these campaign metrics:
    Emails Sent: ${data.emailsSent}
    Email Opens: ${data.emailOpens}
    Social Clicks: ${data.socialClicks}
    Active Influencers: ${data.influencers}
    Total Spend: $${data.spend}
    Revenue Generated: $${data.revenue}

    Please provide 3 very concise, actionable bullet points (no more than 15 words each) on what the user should do next to scale or fix these numbers. Return the data as JSON with a single key 'insights' containing an array of 3 strings.`;

    const rawMsg = await callGroq('You are a data-driven SaaS AI. Return only raw JSON.', prompt, { parseJson: true });
    
    return NextResponse.json({ success: true, data: JSON.parse(rawMsg) });
  } catch (error) {
    console.error('Groq insight error:', error);
    return NextResponse.json({ error: 'Failed to generate insights' }, { status: 500 });
  }
}
