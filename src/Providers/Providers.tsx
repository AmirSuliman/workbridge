'use client';
import { store } from '@/store/store';
import { SessionProvider } from 'next-auth/react';
import React from 'react';
import { Toaster } from 'react-hot-toast';
import { Provider } from 'react-redux';

const Providers: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <SessionProvider>
      <Provider store={store}>
        {children}
        <Toaster position='top-right' reverseOrder={false} gutter={12} />
      </Provider>
    </SessionProvider>
  );
};

export default Providers;
