export const ANALYSIS_SYSTEM_PROMPT = `You are an expert marketing analyst specializing in D2C brands, especially in India and emerging markets.
Your task is to analyze a product and return a comprehensive intelligence report in valid JSON format.
Be specific, actionable, and data-driven. Always structure your response as valid JSON matching the schema exactly.`;

export function buildAnalysisPrompt(productDescription: string, competitors: string): string {
  return `
Analyze this product and return a JSON object with the following structure:

PRODUCT: ${productDescription}

SERPER COMPETITOR DATA: ${competitors}

Return JSON with this EXACT structure:
{
  "usps": [
    {
      "usp_text": "specific unique selling proposition",
      "confidence_score": 0.85
    }
  ],
  "target_audience": {
    "primary": "description",
    "secondary": "description",
    "age_range": "25-35",
    "income_level": "middle to upper-middle class"
  },
  "buyer_personas": [
    {
      "name": "Persona name",
      "demographics": {
        "age_range": "25-32",
        "gender": "primarily female",
        "location": "Metro cities India",
        "income_level": "₹8-15 LPA",
        "education": "Graduate/Post-graduate"
      },
      "psychographics": {
        "values": ["sustainability", "quality"],
        "interests": ["fashion", "wellness"],
        "lifestyle": "Urban professional who values...",
        "pain_points": ["high prices", "poor quality"]
      },
      "behavior": {
        "media_habits": ["Instagram Reels", "YouTube"],
        "purchase_triggers": ["social proof", "limited offers"],
        "preferred_channels": ["Instagram", "Email"]
      }
    }
  ],
  "brand_voice": {
    "tone": "confident and approachable",
    "personality": ["innovative", "trustworthy"],
    "messaging_pillars": ["quality", "affordability", "sustainability"]
  },
  "recommended_channels": [
    {
      "channel": "Instagram",
      "rationale": "primary audience is 25-35 urban Indians",
      "budget_percentage": 40
    }
  ],
  "budget_split": {
    "instagram": 40,
    "email": 20,
    "influencers": 25,
    "content_creation": 15
  },
  "kpis": [
    {
      "name": "Email Open Rate",
      "target": "25%",
      "benchmark": "21% (Indian D2C brands)"
    }
  ],
  "roadmap": {
    "day30": ["Build awareness via influencer seeding", "Launch email list"],
    "day60": ["Scale influencer partnerships", "Run first email campaign"],
    "day90": ["Analyze performance", "Optimize top channels"]
  },
  "campaign_ideas": [
    {
      "title": "Campaign name",
      "description": "What it involves",
      "rationale": "Why this works for this product/audience"
    }
  ]
}

Generate 3-5 USPs, 3-4 buyer personas, 3-5 campaign ideas. Be specific to Indian D2C market.`;
}
