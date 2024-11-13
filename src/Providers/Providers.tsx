'use client';
import React from 'react';
import { Provider } from 'react-redux';
import { store } from '@/src/store/store';
import { Toaster } from 'react-hot-toast';

const Providers: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <Provider store={store}>
            {children}
            <Toaster
                position="top-right"
                reverseOrder={false}
                gutter={8}
            />
        </Provider>
    );
};

export default Providers;
