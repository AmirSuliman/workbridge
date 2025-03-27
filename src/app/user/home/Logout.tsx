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
      // Sign out and clear session
      await signOut({ redirect: false });

      // Force a refresh to clear any cached state
      router.refresh();

      // Redirect to sign-in page after sign out
      router.push('/sign-in');

      // Optional: Clear cookies manually
      document.cookie =
        'next-auth.session-token=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
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
