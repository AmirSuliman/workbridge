import type { Metadata } from 'next';
import './globals.css';
;
import Providers from '../Providers/Providers';
import { getServerSession } from 'next-auth';
import { authOptions } from './api/auth/[...nextauth]/auth-options';

export const metadata: Metadata = {
  title: 'ISA WorkBridge',
  description: 'Some des',
};

const session = await getServerSession(authOptions);

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`antialiased h-[100vh]  bg-[#f5f6fa]`} suppressHydrationWarning>
        <Providers session={session}>
          {children}
        </Providers>
      </body>

    </html>
  );
}

