'use client';
import InputField from '@/components/common/InputField';
import EyeIcon from '@/components/icons/eye-icon';
import { API_ROUTES } from '@/constants/apiRoutes';
import axiosInstance from '@/lib/axios';
import { emailSchema, resetPasswordSchema } from '@/validations/auth';
import { zodResolver } from '@hookform/resolvers/zod';
import { Inter } from 'next/font/google';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { BiLoaderCircle } from 'react-icons/bi';
import imageLoader from '../../../imageLoader';
import Footer from './footer';
import Navbar from './nav';

const inter = Inter({
  variable: '--font-inter',
  preload: false,
});

const ForgotPassword = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const searchParams = useSearchParams();
  const token = searchParams.get('token');

  const handleNavigation = () => {
    router.push('/');
  };
  const [step, setStep] = useState<'email' | 'confirmation'>(
    token ? 'confirmation' : 'email'
  );

  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setconfirmPasswordVisible] = useState(false);
  // type  ForgotPasswordFormInputs = z.infer<step=="email"?typeof emailSchema>;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(step == 'email' ? emailSchema : resetPasswordSchema),
    mode: 'onChange',
  });
  console.log(errors, 'Errors');
  const onSubmit = async (data: any) => {
    setLoading(true);
    if (step == 'email') {
      await axiosInstance
        .post(API_ROUTES.FORGOT_PASSWORD, { email: data.email })
        .then((res) => {
          toast.success('Password reset instructions sent to your email');
          setLoading(false);
          router.push('/Email-sent');
        })
        .catch((error) => {
          setLoading(false);
          toast.error(error.response.data.message ?? 'An error occurred');
        });
    } else if (step == 'confirmation') {
      console.log(data, 'Data confirmation');
      await axiosInstance
        .post(API_ROUTES.CONFIRM_RESET_PASSWORD, {
          token,
          newPassword: data.password,
        })
        .then((res) => {
          toast.success('Password reset successful');
          setLoading(false);
          router.push('/sign-in');
        })
        .catch((error) => {
          setLoading(false);
          toast.error(error?.response?.data?.message ?? 'An error occurred');
        });
    }
  };

  useEffect(() => {
    if (token) {
      setStep('confirmation');
    }
  }, [token]);

  return (
    <>
      <Navbar />
      <div className={`${inter.className} `}>
        <div
          className='h-[400px] '
          style={{
            background: 'linear-gradient(90deg, #0F172A, #11275A)',
          }}
        >
          <div
            className={` flex flex-col items-center justify-start my-auto   `}
          >
            <div className='w-[100%] sm:w-[27rem] mt-[150px] z-10 p-4 border rounded-[27px] backdrop-blur-sm bg-white/30 shadow-lg'>
              <div className='flex flex-col items-center bg-white rounded-[27px] p-8 h-full shadow-custom-deep pt-[2rem] px-[1rem]'>
                <Image
                  loader={imageLoader}
                  src='/Flattened (1).svg'
                  alt='img'
                  width={50}
                  height={50}
                  className='mt-6'
                />
                <h1 className='text-[30px] mt-2'>
                  work<span className='font-bold'>Bridge</span>
                </h1>
                <h3 className='mb-2 text-lg font-semibold text-dark-gray mt-8'>
                  {step == 'confirmation'
                    ? 'Enter New Password'
                    : 'Forgot Your Password?'}
                </h3>
                <p className='w-full text-md mb-6 text-center text-dark-gray '>
                  {step == 'confirmation'
                    ? ''
                    : `Enter your work email and we will send you instructions to reset
              your password.`}
                </p>
                <form onSubmit={handleSubmit(onSubmit)} className='w-full'>
                  {step == 'email' && (
                    <>
                      <label className='text-[14px] mb-1'>Email</label>
                      <InputField
                        error={errors.email?.message as string}
                        register={register}
                        placeholder='Work email'
                        name='email'
                        type='text'
                      />
                    </>
                  )}

                  {step == 'confirmation' && (
                    <>
                      <div className='relative w-full'>
                        <label className='text-[14px]'>Password</label>
                        <div className='relative flex items-center'>
                          <InputField
                            register={register}
                            placeholder='New Password'
                            name='password'
                            type={passwordVisible ? 'text' : 'password'}
                          />
                          <button
                            type='button'
                            onClick={() => setPasswordVisible(!passwordVisible)} // Toggle visibility on click
                            className='absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 pointer-events-auto'
                          >
                            <EyeIcon classNames='w-4' />
                          </button>
                        </div>
                        {errors.password && (
                          <p className='text-red-500 text-xs mt-1'>
                            {errors.password?.message as any}
                          </p>
                        )}
                      </div>
                      <div className='relative w-full'>
                        <label className='text-[14px]'>Confirm Password</label>
                        <div className='relative flex items-center'>
                          <InputField
                            register={register}
                            placeholder='Confirm Password'
                            name='confirmPassword'
                            type={confirmPasswordVisible ? 'text' : 'password'}
                          />
                          <button
                            type='button'
                            onClick={() =>
                              setconfirmPasswordVisible(!confirmPasswordVisible)
                            } // Toggle visibility on click
                            className='absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 pointer-events-auto'
                          >
                            <EyeIcon classNames='w-4' />
                          </button>
                        </div>
                        {errors.confirmPassword && (
                          <p className='text-red-500 text-xs mt-1'>
                            {errors.confirmPassword?.message as any}
                          </p>
                        )}
                      </div>
                    </>
                  )}

                  <button
                    type='submit'
                    className='p-[10px] bg-dark-navy text-sm text-white rounded-md w-full mt-12 mb-3 '
                  >
                    {loading ? (
                      <BiLoaderCircle className='h-4 w-4 animate-spin mx-auto' />
                    ) : (
                      'Continue'
                    )}
                  </button>
                </form>
                {step !== 'confirmation' && (
                  <button
                    onClick={handleNavigation}
                    className='text-black border p-[10px] rounded-md font-semibold text-sm text-center  w-full hover:cursor-pointer'
                  >
                    Back
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='bg-white mt-[400px]'>
        <Footer />
      </div>
    </>
  );
};

export default ForgotPassword;
