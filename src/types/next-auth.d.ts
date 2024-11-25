// types/next-auth.d.ts

import 'next-auth';

interface InnerUser {
  active: boolean;
  email: string;
  firstName: string;
  id: number;
  lastName: string;
  permissions: string[];
  profilePictureUrl: string;
  role: string;
  roleId: number;
}

declare module 'next-auth' {
  interface Session {
    user: {
      active: boolean;
      email: string;
      firstName: string;
      id: number;
      lastName: string;
      permissions: string[];
      profilePictureUrl: string;
      role: string;
      roleId: number;
      userId: string;
      accessToken: string;
      user: InnerUser;
    };
    accessToken: string; // Move accessToken to the root
    expires: string; // Expiration date of the session
  }
}
