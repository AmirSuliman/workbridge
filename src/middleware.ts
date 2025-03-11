import { getToken } from 'next-auth/jwt';
import { withAuth } from 'next-auth/middleware';
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

enum Routes {
  USER_HOME = '/user/home',
  HR_HOME = '/hr/home',
  SIGN_IN = '/sign-in',
}

export default withAuth(
  async function middleware(request: NextRequest) {
    const token: any = await getToken({
      req: request,
      secret: process.env.NEXTAUTH_SECRET,
    });
    const pathname = request.nextUrl.pathname;
    const userRole = token?.user?.user?.role;

    // Allow access to /sign-in for unauthenticated users
    // if (!token && pathname === "/sign-in") {
    //     return NextResponse.next(); // Allow to proceed to /sign-in
    // }

    // Redirect to /sign-in if user is not authenticated on protected routes
    if (!token && pathname !== '/sign-in') {
      return NextResponse.redirect(new URL('/sign-in', request.url));
    }

    // Handle role-based redirects if user is authenticated and accessing /sign-in
    if (token && pathname === '/sign-in') {
      console.log('inside sign in');
      // Redirect based on user role
      if (userRole === 'Admin') {
        return NextResponse.redirect(new URL(Routes.HR_HOME, request.url));
      }
      if (userRole === 'ViewOnly') {
        return NextResponse.redirect(new URL(Routes.USER_HOME, request.url));
      }
    }

    // Enforce role-based access to specific protected routes
    if (token && pathname.startsWith('/user') && userRole === 'Admin') {
      console.log('inside  user path');
      return NextResponse.redirect(new URL(Routes.HR_HOME, request.url));
    }

    if (token && pathname.startsWith('/hr') && userRole === 'ViewOnly') {
      console.log('inside  HR path');
      return NextResponse.redirect(new URL(Routes.USER_HOME, request.url));
    }
    if (token && pathname.startsWith('/hr') && userRole === 'Manager') {
      console.log('inside  HR path');
      return NextResponse.redirect(new URL(Routes.USER_HOME, request.url));
    }

    return NextResponse.next(); // Allow to proceed to requested route
  },
  {
    pages: {
      signIn: '/sign-in',
    },
  }
);

export const config = {
  matcher: ['/', '/sign-in', '/user/:path*', '/hr/:path*'],
};
