import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export default async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Temporary bypass: allow access to all routes unconditionally
  console.log('Temporary bypass active. Access granted to:', pathname);

  // You can include specific logic to only bypass `/hr/home` route if needed:
  // if (pathname === '/hr/home') {
  //   return NextResponse.next();
  // }

  return NextResponse.next(); // Allow to proceed to requested route
}

export const config = {
  matcher: ['/', '/sign-in', '/user/:path*', '/hr/:path*'], // Apply to all routes
};
