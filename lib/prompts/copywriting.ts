export const COPYWRITING_SYSTEM_PROMPT = `You are an expert copywriter specializing in D2C brand emails and social media content for Indian consumers.
You write compelling, conversion-optimized copy. Always respond in valid JSON.`;

export function buildEmailCopyPrompt(
  productName: string,
  usp: string,
  personaName: string,
  campaignGoal: string
): string {
  return `
Write email marketing copy for:
PRODUCT: ${productName}
KEY BENEFIT: ${usp}
AUDIENCE: ${personaName}
GOAL: ${campaignGoal}

Return JSON:
{
  "subject_lines": [
    {"variant": "A", "subject": "subject line 1", "preview": "preview text 1"},
    {"variant": "B", "subject": "subject line 2", "preview": "preview text 2"},
    {"variant": "C", "subject": "subject line 3", "preview": "preview text 3"}
  ],
  "email_body": {
    "html": "Full HTML email with inline styles, compelling copy, and CTA button",
    "plain_text": "Plain text version of the email"
  },
  "cta": {
    "primary_text": "Shop Now",
    "secondary_text": "Learn More",
    "url_placeholder": "{{product_url}}"
  },
  "follow_up_subject": "Follow-up subject for if no open in 48hrs",
  "follow_up_body": "Short follow-up email body (plain text)"
}`;
}

export function buildSocialCopyPrompt(
  productName: string,
  imageDescription: string,
  platform: string,
  tone: string
): string {
  return `
Write social media captions for:
PRODUCT: ${productName}
IMAGE: ${imageDescription}
PLATFORM: ${platform}
TONE: ${tone}

Return JSON:
{
  "primary_caption": "Main English caption (engaging, with emojis)",
  "hindi_caption": "Hindi translation/version of caption",
  "hashtags": ["#hashtag1", "#hashtag2", "#hashtag3"],
  "story_text": "Short punchy text for Instagram Story overlay",
  "cta": "Call to action text"
}`;
}
