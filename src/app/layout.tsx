import type { Metadata } from 'next';
import './globals.css';

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
      <body className={`antialiased h-[100vh]  bg-[#f5f6fa]`}>{children}</body>
    </html>
  );
}
