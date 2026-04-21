import { NextRequest, NextResponse } from 'next/server';

// Mailjet webhook stub - full implementation in Step 4
export async function POST(request: NextRequest) {
  return NextResponse.json({ received: true });
}
