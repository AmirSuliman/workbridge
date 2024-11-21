// types/next-auth.d.ts

import { Session } from 'next-auth';
import { User } from 'next-auth';

// Extending the Session type to include `accessToken`
declare module 'next-auth' {
  interface Session {
    user: User & { accessToken: string }; // Include the `accessToken` in the session's user object
  }

  interface User {
    accessToken: string; // Add the `accessToken` property to the user object
  }
}
