'use client';

import { ReactNode, useRef } from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { QueryClient, QueryClientProvider } from 'react-query';
// import { SessionProvider } from 'next-auth/react'; // Uncomment if you need session management

const error = console.error;
console.error = (...args: any) => {
  if (/defaultProps/.test(args[0])) return;
  error(...args);
};

export default function AuthProvider({
  children,
}: {
  children: ReactNode;
  // session?: any; // Uncomment if using SessionProvider
}) {
  const queryClientRef = useRef<QueryClient | null>(null);

  if (!queryClientRef.current) {
    queryClientRef.current = new QueryClient({
      defaultOptions: {
        queries: {
          retry: false,
          refetchOnWindowFocus: false,
          refetchIntervalInBackground: false,
        },
      },
    });
  }

  return (
    <QueryClientProvider client={queryClientRef.current}>
      {/* Uncomment the following line if using SessionProvider */}
      {/* <SessionProvider session={session}>{children}</SessionProvider> */}
      {children}
    </QueryClientProvider>
  );
}
