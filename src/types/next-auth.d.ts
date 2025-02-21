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
      employeeId: number;
      accessToken: string;
      user: InnerUser;
    };
    accessToken: string; // Move accessToken to the root
    expires: string; // Expiration date of the session
  }
}

interface JobApplicationsState {
  data: {
    totalItems: number;
    items: {
      id: number;
      stage: string;
      jobId: number;
      candidateId: number;
      rating: number | null;
      interviewUrl: string | null;
      createdAt: string;
      job: {
        id: number;
        tittle: string;
        description: string;
        status: string;
        department: {
          id: number;
          name: string;
        };
        location: {
          id: number;
          street1: string;
          street2: string | null;
          zipCode: string;
          city: string;
          country: string;
          state: string;
        };
      };
      candidate: {
        id: number;
        firstName: string;
        lastName: string;
        email: string;
        location: {
          id: number;
          street1: string;
          street2: string | null;
          zipCode: string;
          city: string;
          country: string;
          state: string;
        };
      };
    }[];
    totalPages: number;
    currentPage: number;
  } | null;
  loading: boolean;
  error: string | null;
}
