import { NextRequest, NextResponse } from 'next/server';

export default function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const isLoggedIn = req.cookies.get('isLoggedIn')?.value;

  if (isLoggedIn === 'true' && pathname === '/profile') {
    return NextResponse.redirect(new URL('/', req.url));
  }

  return NextResponse.next();
}
