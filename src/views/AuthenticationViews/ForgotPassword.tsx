'use client';
import WorkBridgeLogo from '@/src/components/icons/work-bridge-logo';
import React from 'react';
import { Inter } from 'next/font/google';

const inter = Inter({
  variable: '--font-inter',
  preload: false,
});

const ForgotPassword = () => {
  return (
    <div
      className={`${inter.className} flex flex-col items-center justify-center my-auto h-[90%] mx-auto bg-gray-100 `}
    >
      <div className="max-w-[90%] sm:max-w-[70%]">
        <div className="flex flex-col bg-gray-100 ">
          <div className="py-[3rem] flex flex-col items-center bg-white h-full shadow-custom-deep  pt-[2rem] px-[2rem]">
            <WorkBridgeLogo classNames="max-w-[14rem] my-[2rem] mb-[2.8rem]" />

            <h3 className="mb-2 text-lg font-semibold text-dark-gray">
              Forgot Your Password?
            </h3>
            <p className="w-full text-md mb-6 text-center text-dark-gray">
              Enter your work email and we will send you instructions to reset
              your password.
            </p>

            <input
              className="p-[10px] px-4 shadow-xs outline-0 border border-gray-200 my-1 rounded-xs text-sm w-full mb-4 placeholder-[#0000009E] rounded-md"
              placeholder="Work email"
              name="workEmail"
              type="text"
            />

            <button className="p-[10px] bg-dark-navy text-sm text-white rounded-md w-full mt-4 mb-6">
              Continue
            </button>
            <p className="text-blue-base  font-semibold text-xs text-center my-2 w-full hover:cursor-pointer">
              Back to workBridge
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
