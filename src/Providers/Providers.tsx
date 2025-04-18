'use client';
import { store } from '@/store/store';
import { SessionProvider } from 'next-auth/react';
import React from 'react';
import { Toaster } from 'react-hot-toast';
import { Provider as ReduxProvider } from 'react-redux';
import { AuthProvider } from './AuthProvider';

const Providers: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <SessionProvider>
      <ReduxProvider store={store}>
        <AuthProvider>
          {children}
          <Toaster position='top-right' reverseOrder={false} gutter={12} />
        </AuthProvider>
      </ReduxProvider>
    </SessionProvider>
  );
};

export default Providers;
