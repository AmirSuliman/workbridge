// middleware.ts
import { jwtDecode } from 'jwt-decode';
import { NextRequest, NextResponse } from 'next/server';

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

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Get the token from the cookies instead of localStorage
  const token = request.cookies.get('accessToken')?.value;

  // Handle unauthenticated users
  if (!token && pathname !== ROUTES.SIGN_IN) {
    return NextResponse.redirect(new URL(ROUTES.SIGN_IN, request.url));
  }

  // Skip further processing if no token
  if (!token) {
    return NextResponse.next();
  }

  try {
    // Decode the JWT token
    const decoded = jwtDecode(token) as any;
    const userRole = decoded?.user?.role as UserRole | undefined;

    // Skip further processing if no role
    if (!userRole) {
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
  } catch (error) {
    // Invalid token
    console.error('Token decode error:', error);

    // For invalid tokens, clear the cookie and redirect to sign-in
    const response = NextResponse.redirect(
      new URL(ROUTES.SIGN_IN, request.url)
    );
    response.cookies.delete('accessToken');
    return response;
  }

  return NextResponse.next();
}

export const config = {
  // Be specific about what paths to match to avoid unnecessary middleware execution
  matcher: ['/', '/sign-in', '/user/:path*', '/hr/:path*'],
};
