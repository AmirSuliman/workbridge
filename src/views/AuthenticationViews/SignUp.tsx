'use client';
import GoogleLogo from '@/src/components/icons/google-logo';
import WorkBridgeLogo from '@/src/components/icons/work-bridge-logo';
import React from 'react';
import { Lato } from 'next/font/google';
import EyeIcon from '@/src/components/icons/eye-icon';

const lato = Lato({
  subsets: ['latin'], // Define subsets as needed
  weight: ['400', '700'], // Choose weights (e.g., 400 for normal, 700 for bold)
});

const SignUp = () => {
  return (
    <div
      className={`${lato.className} flex flex-col items-center justify-center my-auto h-[90%] bg-gray-100`}
    >
      <div className="min-w-[90%] sm:min-w-[24rem]">
        <div className="flex flex-col items-center bg-white h-full shadow-custom-deep pt-[2rem] px-[1rem]">
          <WorkBridgeLogo classNames="max-w-[12rem] mb-[1rem]" />

          <h3 className="text-lg mb-2 text-dark-gray font-semibold ">
            Welcome
          </h3>
          <p className="text-sm mb-6 text-dark-gray">
            Sign Up to ISA workBridge
          </p>

          <input
            className="p-2 px-3 shadow-xs outline-0 placeholder-[#0000009E] border border-[#B8B8B8]  my-1 rounded-xs text-sm text-[#0000009E] rounded-md w-full"
            placeholder="Work Email"
            name="work email"
            type="text"
          />

          <div className="relative  w-full">
            <input
              className=" w-full p-2 px-3 shadow-xs outline-0 placeholder-[#0000009E] border border-[#B8B8B8]  my-1 rounded-xs text-sm text-[#0000009E] rounded-md"
              placeholder="Password"
              name="password"
              type="text"
            />
            <button className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500">
              <EyeIcon classNames="w-4" />
            </button>
          </div>
          <p className="text-blue-base  font-semibold text-xs text-right my-2 w-full hover:cursor-pointer">
            Forgot Password?
          </p>

          <button className="p-[10px] bg-[#0F172A] text-sm text-white w-full rounded-md mt-4">
            Continue
          </button>
          <p className="text-black text-xs w-full mt-3 ms-[1px]">
            By continuing, you accept our terms and conditions.
          </p>
          <p className="text-black text-xs w-full mt-1  ms-[1px]">
            Already have an account?{' '}
            <span className="text-blue-base ">Log In</span>
          </p>

          {/* Separation Line */}
          <div className="flex items-center my-4 w-full">
            <hr className="flex-grow border-t-[2px] border-light-gray" />
            <span className="mx-4  text-txt-dark-gray text-sm">OR</span>
            <hr className="flex-grow border-t-[2px] border-light-gray" />
          </div>

          {/* Continue wit google Button */}
          <button className="flex items-center gap-2 justify-center p-[4px] mb-6 text-[#0000009E] text-xs rounded-md border border-gray-300 w-full">
            <GoogleLogo classNames="max-w-4" />
            Continue with Google
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
