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
      // Call signOut with the redirect parameter set to false
      await signOut({ redirect: false });

      // Force a refresh to ensure all state is cleared
      router.refresh();

      // Manually redirect after successful signOut
      router.push('/sign-in');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <div
      className="flex gap-4 items-center text-xs px-4 py-2 bg-white hover:bg-opacity-50"
      onClick={onLogout}
    >
      <CiLogout /> Logout
    </div>
  );
};

export default Logout;
