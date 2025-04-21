'use client';
import { store } from '@/store/store';
import React from 'react';
import { Toaster } from 'react-hot-toast';
import { Provider as ReduxProvider } from 'react-redux';
import { AuthProvider } from './AuthProvider';

const Providers: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <ReduxProvider store={store}>
      <AuthProvider>
        {children}
        <Toaster position='top-right' reverseOrder={false} gutter={12} />
      </AuthProvider>
    </ReduxProvider>
  );
};

export default Providers;
