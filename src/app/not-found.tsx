// src/app/not-found.tsx

'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import Button from '@/components/Button';

export default function NotFound() {
  const router = useRouter();
  return (
    <main className="flex items-center justify-center min-h-screen">
      <nav className="p-8 bg-white rounded-md shadow-md">
        <h1 className="font-medium text-3xl">404 - Page Not Found</h1>
        <p className="py-4">
          Sorry, the page you&apos;re looking for doesn&apos;t exist.
        </p>
        <Button
          onClick={() => router.back()}
          icon={''}
          name="Go back"
          className="mx-auto"
        />
      </nav>
    </main>
  );
}
