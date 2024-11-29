'use client';
import { signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React from 'react';
import { CiLogout } from 'react-icons/ci';

const Logout = () => {
  const router = useRouter();
  const onLogout = async () => {
    await signOut();
    router.replace('/sign-in');
  };

  return (
    // it is div becuse button causes hydration error - button inside button
    <div
      className="flex gap-2 items-center text-xs px-4 py-2 bg-white hover:bg-opacity-50"
      onClick={onLogout}
    >
      <CiLogout /> Logout
    </div>
  );
};

export default Logout;
