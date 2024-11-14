'use client';
import WorkBridgeLogo from '@/src/components/icons/work-bridge-logo';
import React, { useEffect, useState } from 'react';
import { Inter } from 'next/font/google';
import InputField from '@/src/components/common/InputField';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { emailSchema, resetPasswordSchema } from '@/src/validations/auth';
import { z } from 'zod';
import axiosInstance from '@/src/lib/axios';
import { API_ROUTES } from '@/src/constants/apiRoutes';
import toast from 'react-hot-toast';
import { useRouter, useSearchParams } from 'next/navigation';
import EyeIcon from '@/src/components/icons/eye-icon';
import { BiLoaderCircle } from 'react-icons/bi';

const inter = Inter({
  variable: '--font-inter',
  preload: false,
});

const ForgotPassword = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const searchParams = useSearchParams()
  const token = searchParams.get('token')

  const [step, setStep] = useState<"email" | "confirmation">(
    token ? "confirmation" : "email"
  );

  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setconfirmPasswordVisible] = useState(false);
  // type  ForgotPasswordFormInputs = z.infer<step=="email"?typeof emailSchema>;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(step == "email" ? emailSchema : resetPasswordSchema),
    mode: 'onChange',
  });
  console.log(errors, 'Errors');
  const onSubmit = async (data: any) => {
    setLoading(true);
    if (step == "email") {
      await axiosInstance.post(API_ROUTES.FORGOT_PASSWORD, { email: data.email }).then((res) => {
        toast.success('Password reset instructions sent to your email');
        setLoading(false);
        router.push('/sing-in');
      }).catch((error) => {
        setLoading(false);
        toast.error(error.response.data.message ?? 'An error occurred');
      });

    } else if (step == "confirmation") {
      console.log(data, 'Data confirmation');
      await axiosInstance.post(API_ROUTES.CONFIRM_RESET_PASSWORD, {
        token,
        newPassword: data.password,
      })
        .then((res) => {
          toast.success('Password reset successful');
          setLoading(false);
          router.push('/login');

        })
        .catch((error) => {
          setLoading(false);
          toast.error(error.response.data.message ?? 'An error occurred');
        });

    }

  }

  useEffect(() => {
    if (token) {
      setStep("confirmation")
    }
  }, [token])

  return (
    <div
      className={`${inter.className} flex flex-col items-center justify-center my-auto h-[90%] ] mx-auto bg-gray-100 `}
    >
      <div className="max-w-[90%] min-w-[26rem] sm:max-w-[70%]">
        <div className="flex flex-col bg-gray-100 ">
          <div className="py-[3rem] flex flex-col items-center bg-white h-full shadow-custom-deep  pt-[2rem] px-[2rem]">
            <WorkBridgeLogo classNames="max-w-[14rem] my-[2rem] mb-[2.8rem]" />

            <h3 className="mb-2 text-lg font-semibold text-dark-gray">
              {step == "confirmation" ? "Enter New Password" : "Forgot Your Password?"}
            </h3>
            <p className="w-full text-md mb-6 text-center text-dark-gray">
              {step == "confirmation" ? "Please Enter New Password" : `Enter your work email and we will send you instructions to reset
              your password.`}
            </p>
            <form onSubmit={handleSubmit(onSubmit)} className="w-full">
              {step == "email" &&
                <InputField
                  error={errors.email?.message as any}
                  register={register}
                  placeholder="Work email"
                  name="email"
                  type="text"
                />}

              {step == "confirmation" &&
                <>
                  <div className="relative w-full">
                    <div className="relative flex items-center">
                      <InputField

                        register={register}
                        placeholder="New Password"
                        name="password"
                        type={passwordVisible ? "text" : "password"}
                      />
                      <button
                        type="button"
                        onClick={() => setPasswordVisible(!passwordVisible)} // Toggle visibility on click
                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 pointer-events-auto"
                      >
                        <EyeIcon classNames="w-4" />
                      </button>
                    </div>
                    {errors.password && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.password?.message as any}
                      </p>
                    )}
                  </div>
                  <div className="relative w-full">
                    <div className="relative flex items-center">

                      <InputField
                        register={register}
                        placeholder="Confirm Password"
                        name="confirmPassword"
                        type={confirmPasswordVisible ? "text" : "password"}
                      />
                      <button
                        type="button"
                        onClick={() => setconfirmPasswordVisible(!confirmPasswordVisible)} // Toggle visibility on click
                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 pointer-events-auto"
                      >
                        <EyeIcon classNames="w-4" />
                      </button>
                    </div>
                    {errors.confirmPassword && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.confirmPassword?.message as any}
                      </p>
                    )}
                  </div>

                </>
              }

              <button type='submit' className="p-[10px] bg-dark-navy text-sm text-white rounded-md w-full mt-4 mb-6">
                {loading ? (
                  <BiLoaderCircle className="h-4 w-4 animate-spin mx-auto" />
                ) : (
                  'Continue'
                )}
              </button>
            </form>
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
