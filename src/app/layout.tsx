import type { Metadata } from 'next';
import './globals.css';
import { Provider } from 'react-redux';
import { store } from '@/src/store/store';
import Providers from '../Providers/Providers';

export const metadata: Metadata = {
  title: 'ISA WorkBridge',
  description: 'Some des',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`antialiased h-[100vh]  bg-[#f5f6fa]`}>
        <Providers>
          {children}
        </Providers>
      </body>

    </html>
  );
}

