'use client';
import ForgotPassword from '@/views/AuthenticationViews/ForgotPassword';
import React from 'react';

const page = () => {
  return (
    <div className='h-full flex flex-col item-start justify-start bg-gray-100'>
      <ForgotPassword />
    </div>
  );
};

export default page;
