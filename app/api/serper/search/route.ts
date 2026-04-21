import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { serperSearch } from '@/lib/serper/client';

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const { query, num } = await request.json();
    if (!query) return NextResponse.json({ error: 'query required' }, { status: 400 });

    const results = await serperSearch(query, num ?? 10);
    return NextResponse.json({ success: true, data: results });
  } catch (error) {
    console.error('Serper search error:', error);
    return NextResponse.json({ error: 'Search failed' }, { status: 500 });
  }
}
