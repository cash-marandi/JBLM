
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const { username, password } = await req.json();

  // In a real application, you would validate the credentials against a database.
  if (username === 'admin' && password === 'password') {
    const response = NextResponse.json({ message: 'Login successful' });
    // Set a cookie to maintain the session
    response.cookies.set('auth', 'true', { path: '/', httpOnly: true });
    return response;
  } else {
    return NextResponse.json({ message: 'Invalid username or password' }, { status: 401 });
  }
}
