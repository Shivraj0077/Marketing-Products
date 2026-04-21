import Mailjet from 'node-mailjet';

let mailjetInstance: ReturnType<typeof Mailjet.apiConnect> | null = null;

function getMailjet() {
  if (!mailjetInstance) {
    const apiKey = process.env.MAILJET_API_KEY || 'MISSING_KEY';
    const apiSecret = process.env.MAILJET_SECRET_KEY || 'MISSING_SECRET';
    mailjetInstance = Mailjet.apiConnect(apiKey, apiSecret);
  }
  return mailjetInstance;
}

export interface EmailRecipient {
  email: string;
  name?: string;
}

export interface SendEmailOptions {
  to: EmailRecipient[];
  subject: string;
  htmlPart: string;
  textPart?: string;
  fromEmail?: string;
  fromName?: string;
}

/**
 * Send an email via Mailjet API v3.1
 */
export async function sendEmail(opts: SendEmailOptions) {
  const {
    to,
    subject,
    htmlPart,
    textPart,
    fromEmail = 'noreply@instamarketer.ai',
    fromName = 'InstaMarketer AI',
  } = opts;

  const mailjet = getMailjet();
  const result = await mailjet.post('send', { version: 'v3.1' }).request({
    Messages: [
      {
        From: { Email: fromEmail, Name: fromName },
        To: to.map(r => ({ Email: r.email, Name: r.name ?? r.email })),
        Subject: subject,
        HTMLPart: htmlPart,
        ...(textPart && { TextPart: textPart }),
      },
    ],
  });

  return result.body;
}

/**
 * Get Mailjet campaign stats for a given campaign ID
 */
export async function getCampaignStats(campaignId: string) {
  const mailjet = getMailjet();
  const result = await mailjet
    .get('statscounters', { version: 'v3' })
    .request({ CounterSource: 'Campaign', CounterID: campaignId });
  return result.body;
}
