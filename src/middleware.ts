import { jwtDecode } from 'jwt-decode';
import { User } from 'next-auth';
import { getToken } from 'next-auth/jwt';
import { withAuth } from 'next-auth/middleware';
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

// Define routes as constants for better maintainability
const ROUTES = {
  USER_HOME: '/user/home',
  HR_HOME: '/hr/home',
  SIGN_IN: '/sign-in',
};

// Define roles for better type safety
type UserRole = 'Admin' | 'SuperAdmin' | 'Manager' | 'ViewOnly';

// Define role access map to simplify permission checks
const ROLE_ACCESS = {
  Admin: {
    canAccessUserRoutes: false,
    canAccessHrRoutes: true,
    defaultRedirect: ROUTES.HR_HOME,
  },
  SuperAdmin: {
    canAccessUserRoutes: false,
    canAccessHrRoutes: true,
    defaultRedirect: ROUTES.HR_HOME,
  },
  Manager: {
    canAccessUserRoutes: true,
    canAccessHrRoutes: false,
    defaultRedirect: ROUTES.USER_HOME,
  },
  ViewOnly: {
    canAccessUserRoutes: true,
    canAccessHrRoutes: false,
    defaultRedirect: ROUTES.USER_HOME,
  },
};

export default withAuth(
  async function middleware(request: NextRequest) {
    console.log('Middleware triggered');

    let token = localStorage.getItem('accessToken');
    if (token?.startsWith('Bearer ')) {
      token = token.replace('Bearer ', '');
    }
    const user = jwtDecode(token!.trim()) as any;
    const pathname = request.nextUrl.pathname;
    const userRole = user.user!.role as UserRole | undefined;
    console.log('User Role:', userRole);

    // Handle unauthenticated users
    if (!token && pathname !== ROUTES.SIGN_IN) {
      return NextResponse.redirect(new URL(ROUTES.SIGN_IN, request.url));
    }

    // Skip further processing if no token or no role
    if (!token || !userRole) {
      return NextResponse.next();
    }

    // Get role access configuration
    const roleAccess = ROLE_ACCESS[userRole];

    // Handle unknown roles gracefully
    if (!roleAccess) {
      return NextResponse.next();
    }

    // Authenticated user trying to access sign-in page
    if (pathname === ROUTES.SIGN_IN) {
      return NextResponse.redirect(
        new URL(roleAccess.defaultRedirect, request.url)
      );
    }

    // Role-based path restrictions
    if (pathname.startsWith('/user') && !roleAccess.canAccessUserRoutes) {
      return NextResponse.redirect(
        new URL(roleAccess.defaultRedirect, request.url)
      );
    }

    if (pathname.startsWith('/hr') && !roleAccess.canAccessHrRoutes) {
      return NextResponse.redirect(
        new URL(roleAccess.defaultRedirect, request.url)
      );
    }

    return NextResponse.next();
  },
  {
    pages: {
      signIn: ROUTES.SIGN_IN,
    },
  }
);

export const config = {
  // Be specific about what paths to match to avoid unnecessary middleware execution
  matcher: ['/', '/sign-in', '/user/:path*', '/hr/:path*'],
};
