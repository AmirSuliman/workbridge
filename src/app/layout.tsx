import ErrorBoundary from '@/components/ErrorBoundary';
import type { Metadata } from 'next';
import Providers from '../Providers/Providers';
import './globals.css';
import { Suspense } from 'react';
import ScreenLoader from '@/components/common/ScreenLoader';

export const metadata: Metadata = {
  title: 'ISA WorkBridge',
  description:
    'WorkBridge is an all-in-one employee management platform built to streamline HR operations and empower organizations through smart digital solutions. From onboarding and performance tracking to document management and policy automation, WorkBridge supports end-to-end employee lifecycle management. Our team of dedicated developers, product strategists, and HR tech experts collaborate across time zones to deliver scalable, intuitive, and secure solutions tailored to modern workforce needs.',
  icons: '/favicon.ico',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body
        className={`antialiased h-[100vh]  bg-[#f5f6fa]`}
        suppressHydrationWarning
      >
        <Providers>
          <ErrorBoundary>
            <Suspense fallback={<ScreenLoader />}>{children}</Suspense>
          </ErrorBoundary>
        </Providers>
      </body>
    </html>
  );
}
