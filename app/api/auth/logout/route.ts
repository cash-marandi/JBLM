
import { NextResponse } from 'next/server';

export async function POST() {
  const response = NextResponse.json({ message: 'Logout successful' });
  response.cookies.set('auth', '', { path: '/', httpOnly: true, maxAge: -1 });
  return response;
}
