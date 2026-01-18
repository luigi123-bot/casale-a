import { NextRequest, NextResponse } from 'next/server';
import { SignJWT } from 'jose';

const secret = new TextEncoder().encode(process.env.JWT_SECRET!);

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { email, password } = body;

  // Simulate user lookup
  const users: Array<{ id: string; email: string; password: string; role: string }> = [
    { id: '1', email: 'client@example.com', password: 'pass', role: 'CLIENT' },
    { id: '2', email: 'cashier@example.com', password: 'pass', role: 'CASHIER' },
    { id: '3', email: 'admin@example.com', password: 'pass', role: 'ADMIN' },
    { id: '4', email: 'super@example.com', password: 'pass', role: 'SUPER_ADMIN' },
  ];

  const user = users.find(u => u.email === email && u.password === password);

  if (!user) {
    return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
  }

  const token = await new SignJWT({ userId: user.id, role: user.role })
    .setProtectedHeader({ alg: 'HS256' })
    .setExpirationTime('1h')
    .sign(secret);

  const response = NextResponse.json({ user: { id: user.id, email: user.email, name: user.email.split('@')[0], role: user.role }, token });

  // Set cookie
  response.cookies.set('token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 3600, // 1 hour
  });

  return response;
}