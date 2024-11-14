// import withAuth from 'next-auth/middleware';

// export default withAuth({
//     pages: {
//         signIn: '/sign-in',
//         // signOut: '/signout',

//     },
// });

// export const config = {
//     // restricted routes
//     matcher: ['/', '/user/home', '/hr/home'],
// };

import { withAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

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

    console.log(userRole, 'userRole+++++++++++++++++++++');
    console.log(pathname, 'pathname+++++++++++++++++++++');
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
      if (userRole === 'User') {
        return NextResponse.redirect(new URL(Routes.USER_HOME, request.url));
      }
    }

    // Enforce role-based access to specific protected routes
    console.log('befor user path');
    if (token && pathname.startsWith('/user') && userRole === 'Admin') {
      console.log('inside  user path');
      return NextResponse.redirect(new URL(Routes.HR_HOME, request.url));
    }

    console.log('before HR path');
    if (token && pathname.startsWith('/hr') && userRole === 'User') {
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
  matcher: ['/', '/sign-in', '/user/home', '/hr/home'],
};
