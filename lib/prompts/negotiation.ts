export const NEGOTIATION_SYSTEM_PROMPT = `You are simulating a negotiation between a brand and an Instagram influencer.
You will play BOTH roles sequentially to simulate a realistic negotiation.
Base your simulation on real influencer market rates in India (₹5K-₹50K for 10K-500K followers).
Always respond in valid JSON.`;

export function buildNegotiationPrompt(
  influencerUsername: string,
  followerCount: number,
  engagementRate: number,
  bio: string,
  productName: string,
  brandBudget: number,
  deliverables: string,
  productCategory: string
): string {
  const estimatedRate = Math.round(followerCount * 0.05); // ₹ per 1000 followers = ~₹50/K
  const priceMin = Math.max(5000, estimatedRate * 0.7);
  const priceMax = estimatedRate * 1.4;

  return `
Simulate a COMPLETE negotiation between:

BRAND: ${productName} (${productCategory})
Budget: ₹${brandBudget.toLocaleString('en-IN')}
Wants: ${deliverables}

INFLUENCER: @${influencerUsername}
Followers: ${followerCount.toLocaleString('en-IN')}
Engagement Rate: ${engagementRate}%
Bio: ${bio}
Estimated Rate: ₹${priceMin.toLocaleString('en-IN')} - ₹${priceMax.toLocaleString('en-IN')}

Simulate 4-5 rounds of negotiation. Make it realistic — influencer may counter-offer, ask for free products, or discuss usage rights.

Return JSON:
{
  "influencer_profile": {
    "estimated_price_range": "₹X - ₹Y",
    "negotiation_style": "Premium/Flexible/Exposure-driven",
    "content_preferences": ["Reels", "Stories"],
    "deal_breakers": ["no exclusivity clauses", "prefer lifestyle content"]
  },
  "messages": [
    {
      "sender": "brand",
      "message_text": "message content",
      "offer_amount": 15000,
      "round_number": 1,
      "timestamp_offset": 0
    },
    {
      "sender": "influencer",
      "message_text": "message content",
      "offer_amount": 25000,
      "round_number": 2,
      "timestamp_offset": 1
    }
  ],
  "final_deal": {
    "accepted": true,
    "final_price": 20000,
    "deliverables": ["2 feed posts", "3 stories", "1 reel"],
    "terms": {
      "usage_rights": "Brand can reuse content for 3 months",
      "exclusivity": false,
      "timeline": "Content delivery within 14 days"
    },
    "confidence_score": 78
  },
  "deal_summary": {
    "outcome": "accepted",
    "key_decision_points": ["Free product + commission sealed the deal", "Waived exclusivity was key"],
    "what_worked": "Offering commission on top of fixed fee",
    "what_could_improve": "Could have started lower to leave room for negotiation"
  },
  "outreach_messages": {
    "instagram_dm": "Ready-to-send Instagram DM based on negotiation outcome",
    "email": "Ready-to-send professional email if contact available"
  }
}`;
}

export function buildInfluencerScoringPrompt(
  influencerData: string,
  productName: string,
  targetPersona: string
): string {
  return `
Score this influencer for a brand collaboration:

INFLUENCER DATA: ${influencerData}
PRODUCT: ${productName}
TARGET PERSONA: ${targetPersona}

Return JSON:
{
  "audience_match_score": 85,
  "content_relevance_score": 78,
  "fake_follower_risk": "Low",
  "engagement_quality": "High",
  "fit_reason": "Detailed explanation of why this influencer fits",
  "ad_script": "Customized ad caption in their style and voice",
  "estimated_reach": 45000,
  "estimated_engagement": 1800,
  "recommended_deal": {
    "deliverables": ["1 reel", "2 stories"],
    "suggested_budget": "₹15,000-₹20,000",
    "campaign_angle": "Lifestyle integration with authentic storytelling"
  }
}`;
}

export function buildSimulationPrompt(
  influencerUsername: string,
  followerCount: number,
  niche: string,
  brandBudget: number,
  campaignGoal: string,
  history: any[]
): string {
  return `
You are simulating a negotiation between a brand and an Instagram influencer.
You will play BOTH roles sequentially if asked, but in this specific prompt you are acting as the INFLUENCER named @${influencerUsername}.

INFLUENCER PROFILE:
Username: @${influencerUsername}
Followers: ${followerCount.toLocaleString('en-IN')}
Niche: ${niche}

BRAND NEGOTIATOR (User):
Target Deliverable: ${campaignGoal}
Max Budget (Internal to brand): $${brandBudget} 
Note: The influencer does not know the exact budget but has typical industry rates.

PREVIOUS MESSAGES:
${history.map(msg => msg.role.toUpperCase() + ': ' + msg.content).join('\n')}

Based on the conversation history, generate the NEXT response from the influencer (@${influencerUsername}).
Be extremely realistic to how modern creators negotiate. If the budget is low, reject it or offer less work. If it's fair, counter slightly or accept.

Return ONLY this JSON schema:
{
  "reply": "The actual message text you send to the brand",
  "internal_sentiment": "Positive/Neutral/Hesitant/Insulted",
  "suggested_counter": "Optional string describing a strategic counter offer the brand should make next",
  "deal_reached": true/false/null, // true if accepted, false if rejected/walked away, null if negotiations are ongoing
  "agreed_price": number // Required if deal_reached === true
}
  `;
}
