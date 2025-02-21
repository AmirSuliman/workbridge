'use client';
import React from 'react';
import { Provider } from 'react-redux';
import { store } from '@/store/store';
import { Toaster } from 'react-hot-toast';
import { SessionProvider } from 'next-auth/react';

const Providers: React.FC<{ children: React.ReactNode; session: any }> = ({
  children,
  session,
}) => {
  return (
    <SessionProvider session={session}>
      <Provider store={store}>
        {children}
        <Toaster position="top-right" reverseOrder={false} gutter={12} />
      </Provider>
    </SessionProvider>
  );
};

export default Providers;
