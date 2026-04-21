import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { sendEmail } from '@/lib/mailjet/client';

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const { campaignName, subject, bodyHtml, bodyText, recipients, productId } = await request.json();

    if (!subject || !bodyHtml || !recipients?.length) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Default sender or use user's email if possible
    const senderEmail = process.env.MAILJET_SENDER_EMAIL ?? 'hello@instamarketer.ai'; // Update this to your verified sender
    const senderName = user.user_metadata?.full_name ?? 'InstaMarketer Brand';

    // Call Mailjet wrapper
    const result = await sendEmail({
      to: recipients.map((r: any) => ({ email: r.Email, name: r.Name })),
      subject,
      htmlPart: bodyHtml,
      textPart: bodyText ?? bodyHtml.replace(/<[^>]+>/g, ''), // Fallback text
      fromEmail: senderEmail,
      fromName: senderName,
    });

    // Save campaign to Supabase
    const { data: campaign, error } = await supabase.from('email_campaigns').insert({
      user_id: user.id,
      product_id: productId ?? null,
      name: campaignName ?? subject,
      subject,
      body_html: bodyHtml,
      status: 'sent',
      mailjet_campaign_id: (result as any).Messages?.[0]?.To?.[0]?.MessageID ?? 'mock_id',
    }).select().single();

    if (error) {
      console.error('Failed to save campaign:', error);
    }

    // Update usage
    await supabase.rpc('increment_usage', {
      p_user_id: user.id,
      p_field: 'emails_sent',
    }).maybeSingle();

    return NextResponse.json({ success: true, data: result, campaign });
  } catch (error) {
    console.error('Mailjet send error:', error);
    return NextResponse.json({ error: 'Failed to send campaign' }, { status: 500 });
  }
}
