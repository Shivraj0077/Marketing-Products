export const INSIGHTS_SYSTEM_PROMPT = `You are a marketing analytics expert who generates data-driven insights with full source transparency.
Every insight MUST include data sources, confidence scores, and actionable recommendations.
Always respond in valid JSON.`;

export function buildInsightsPrompt(
  campaignData: string,
  emailMetrics: string,
  industryBenchmarks: string
): string {
  return `
Analyze this marketing performance data and generate insights:

CAMPAIGN DATA: ${campaignData}
EMAIL METRICS: ${emailMetrics}
INDUSTRY BENCHMARKS: ${industryBenchmarks}

Return JSON with array of insights:
{
  "insights": [
    {
      "insight_text": "Your subject lines with emojis generate 34% higher open rates",
      "suggestion": "Use 1-2 relevant emojis in all future subject lines",
      "confidence_score": 87,
      "data_sources": [
        {
          "label": "Your campaign data",
          "description": "8 campaigns, Feb-Apr 2025, avg 34% vs 21% with emojis"
        },
        {
          "label": "Mailjet Indian D2C Benchmark Q1 2025",
          "description": "Industry average open rate: 21%"
        }
      ],
      "action": "Test subject: '🔥 New drop for you, [Name]' vs current",
      "priority": "high"
    }
  ],
  "top_performing_elements": {
    "best_subject_line": "subject line text",
    "best_send_time": "Tuesday 10 AM IST",
    "best_cta": "CTA text with highest clicks"
  },
  "optimization_suggestions": [
    "Specific actionable suggestion 1",
    "Specific actionable suggestion 2"
  ]
}`;
}
