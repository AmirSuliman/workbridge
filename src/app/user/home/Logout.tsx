'use client';
import { signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React from 'react';
import { CiLogout } from 'react-icons/ci';

const Logout = () => {
  const router = useRouter();

  const onLogout = async (e) => {
    e.preventDefault();

    try {
      router.push('/');

      // Sign out without redirecting immediately
      await signOut({ redirect: false });

      // Force a refresh to clear any cached session state
      router.refresh();

      // Redirect to the home page manually
      router.push('/');

      // Optional: Clear cookies manually to ensure full logout
      document.cookie =
        'next-auth.session-token=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT; SameSite=None; Secure';
      document.cookie =
        'next-auth.csrf-token=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT; SameSite=None; Secure';
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <div
      className="flex gap-4 items-center text-xs px-4 py-2 bg-white hover:bg-opacity-50"
      onClick={onLogout}
      role="button"
      tabIndex={0}
      aria-label="Logout"
    >
      <CiLogout /> Logout
    </div>
  );
};

export default Logout;
