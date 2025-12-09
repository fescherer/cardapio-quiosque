import { NextRequest, NextResponse } from 'next/server';

const attempts = new Map<string, { count: number, last: number }>();

export async function POST(req: NextRequest) {
  const { password } = await req.json();

  // Get real client IP from Vercel / proxy
  const ip
    = req.headers.get('x-forwarded-for')?.split(',')[0].trim()
      || 'unknown';

  const now = Date.now();
  const record = attempts.get(ip) || { count: 0, last: 0 };

  // Block for 3 hours
  if (record.count >= 3 && now - record.last < 3 * 60 * 60 * 1000) {
    return NextResponse.json(
      { success: false, message: 'Too many attempts, try later.' },
      { status: 403 },
    );
  }

  if (password === process.env.ADMIN_PASSWORD) {
    attempts.set(ip, { count: 0, last: now });
    return NextResponse.json({ success: true });
  }

  // Wrong password
  attempts.set(ip, { count: record.count + 1, last: now });
  return NextResponse.json(
    { success: false, message: 'Invalid password.' },
    { status: 401 },
  );
}
