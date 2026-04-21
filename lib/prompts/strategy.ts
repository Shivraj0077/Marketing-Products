export const STRATEGY_SYSTEM_PROMPT = `You are a senior marketing strategist with 15 years of experience in D2C brand building in India and Southeast Asia.
You create detailed, actionable marketing strategy documents. Always respond in valid JSON.`;

export function buildStrategyPrompt(
  productName: string,
  usps: string[],
  personas: string,
  competitors: string,
  channels: string[]
): string {
  return `
Create a comprehensive marketing strategy document for:

PRODUCT: ${productName}
USPs: ${usps.join(', ')}
TOP CHANNELS: ${channels.join(', ')}

BUYER PERSONAS SUMMARY: ${personas}
COMPETITORS FOUND: ${competitors}

Return JSON with this structure:
{
  "executive_summary": "2-3 paragraph executive summary of the marketing strategy",
  "positioning_statement": "For [target] who [need], [product] is [category] that [benefit]. Unlike [competitor], our product [differentiation].",
  "brand_voice": "Detailed brand voice and communication guidelines",
  "phase1": {
    "title": "30-Day Foundation",
    "goals": ["goal1", "goal2"],
    "tactics": [
      {
        "action": "specific action",
        "platform": "channel",
        "frequency": "daily/weekly",
        "estimated_reach": "1000-5000",
        "cost": "₹5,000-₹15,000"
      }
    ],
    "budget": "₹30,000-₹50,000"
  },
  "phase2": {
    "title": "60-Day Growth",
    "goals": ["goal1", "goal2"],
    "tactics": [],
    "budget": "₹50,000-₹80,000"
  },
  "phase3": {
    "title": "90-Day Scale",
    "goals": ["goal1", "goal2"],
    "tactics": [],
    "budget": "₹80,000-₹1,50,000"
  },
  "content_calendar": {
    "instagram_posts_per_week": 5,
    "stories_per_day": 3,
    "emails_per_month": 4,
    "reels_per_week": 2
  },
  "success_metrics": {
    "month1": {"instagram_followers": "+500", "email_subscribers": "+200"},
    "month3": {"instagram_followers": "+2000", "email_subscribers": "+1000", "revenue_lift": "15-25%"}
  }
}`;
}
