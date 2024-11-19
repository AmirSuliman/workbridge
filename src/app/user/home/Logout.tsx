'use client';
import { signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React from 'react';

const Logout = () => {
  const router = useRouter();
  const onLogout = async () => {
    console.log('Logging out');
    await signOut();
    router.replace('/sign-in');
  };

  return (
    <div>
      <button
        className="border-md bg-red-500 border-gray-border text-xs font-semibold text-white rounded-md p-2"
        onClick={onLogout}
      >
        Logout
      </button>
    </div>
  );
};

export default Logout;
