import type { Metadata } from 'next';
import './globals.css';
import Providers from '../Providers/Providers';
import { getServerSession } from 'next-auth';
import { authOptions } from './api/auth/[...nextauth]/auth-options';
import ErrorBoundary from '@/components/ErrorBoundary';

export const metadata: Metadata = {
  title: 'ISA WorkBridge',
  description: 'Some des',
  icons: '/favicon.ico',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(authOptions);
  return (
    <html lang="en">
      <body
        className={`antialiased h-[100vh]  bg-[#f5f6fa]`}
        suppressHydrationWarning
      >
        <Providers session={session}>
          <ErrorBoundary>{children}</ErrorBoundary>
        </Providers>
      </body>
    </html>
  );
}
