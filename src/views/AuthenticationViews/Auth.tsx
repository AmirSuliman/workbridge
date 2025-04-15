'use client';
import InputField from '@/components/common/InputField';
import EyeIcon from '@/components/icons/eye-icon';
import { fetchUserData } from '@/services/myInfo';
import { setUser } from '@/store/slices/myInfoSlice';
import { authSchema } from '@/validations/auth';
import { zodResolver } from '@hookform/resolvers/zod';
import { getSession, signIn, signOut } from 'next-auth/react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { BiLoaderCircle } from 'react-icons/bi';
import { useDispatch } from 'react-redux';
import { z } from 'zod';
import Footer from './footer';
import Navbar from './nav';
import ScreenLoader from '@/components/common/ScreenLoader';
import axiosInstance from '@/lib/axios';

type AuthFormInputs = z.infer<typeof authSchema>;

const Auth = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedOut, setIsLoggedOut] = useState(false);

  // Check for logout flag in URL
  const logoutParam = searchParams.get('logout');
  const callbackUrl = searchParams.get('callbackUrl') || '';

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<AuthFormInputs>({
    resolver: zodResolver(authSchema),
    mode: 'onChange',
  });

  const getAbsoluteUrl = useCallback((url: string) => {
    if (!url) return '';

    try {
      // If the URL is already absolute, return it
      new URL(url);
      return url;
    } catch (error) {
      // If the URL is relative, prepend the base URL
      return `${window.location.origin}${url}`;
    }
  }, []);

  const handleRedirect = useCallback(
    (userData: any, token: string) => {
      if (userData?.firstTime) {
        router.replace('/update-password');
        return;
      }

      const decodedCallbackUrl = callbackUrl
        ? decodeURIComponent(callbackUrl)
        : '';
      const absoluteCallbackUrl = getAbsoluteUrl(decodedCallbackUrl);

      if (
        decodedCallbackUrl &&
        (decodedCallbackUrl.startsWith('/hr/') ||
          decodedCallbackUrl.startsWith('/user/'))
      ) {
        router.replace(absoluteCallbackUrl);
      } else {
        // Default redirect based on role
        router.replace(
          userData.role === 'Manager' || userData.role === 'ViewOnly'
            ? '/user/home'
            : '/hr/home'
        );
      }
    },
    [callbackUrl, getAbsoluteUrl, router]
  );

  // Handle the logout parameter from URL
  useEffect(() => {
    if (logoutParam) {
      setIsLoggedOut(true);
      // Remove query parameters but keep the page at /sign-in
      window.history.replaceState(null, '', '/sign-in');

      // Show a toast message if needed
      if (logoutParam === 'success') {
        toast.success('You have been successfully logged out');
      }

      setIsLoading(false);
    }
  }, [logoutParam]);

  // Check for existing session when component mounts
  // If session exist then go to home page without re-login
  useEffect(() => {
    let isMounted = true;
    // Skip session check if we just logged out
    if (isLoggedOut) {
      setIsLoading(false);
      return;
    }
    const checkSession = async () => {
      try {
        const token = localStorage.getItem('accessToken');

        if (!isMounted) return;

        if (token) {
          try {
            const userData = await fetchUserData(token);

            if (!isMounted) return;

            dispatch(setUser(userData));
            handleRedirect(userData, token);
          } catch (error) {
            // Token invalid - just continue to login page
            setIsLoading(false);
          }
        } else {
          setIsLoading(false);
        }
      } catch (error) {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    // Add event listener for back button
    const handlePopState = () => {
      window.history.pushState(null, '', window.location.pathname);
    };

    window.addEventListener('popstate', handlePopState);
    checkSession();

    return () => {
      isMounted = false;
      window.removeEventListener('popstate', handlePopState);
    };
  }, [dispatch, handleRedirect]);

  // Add cache control headers
  const onSubmit = async (data: AuthFormInputs) => {
    try {
      setIsLoading(true);
      const decodedCallbackUrl = decodeURIComponent(callbackUrl);
      const absoluteCallbackUrl = getAbsoluteUrl(decodedCallbackUrl);

      const res = await axiosInstance.post('/user/login', {
        email: data.email,
        password: data.password,
      });

      if (!res?.data?.data?.accessToken) {
        toast.error('Invalid Email or Password!');
        setIsLoading(false);
        return;
      }

      const accessToken = res.data.data.accessToken.accessToken;

      if (accessToken) {
        try {
          const userData = await fetchUserData(accessToken);
          dispatch(setUser(userData));
          handleRedirect(userData, accessToken);
        } catch (error) {
          console.error('Error fetching user data:', error);
          toast.error(
            error instanceof Error ? error.message : 'Failed to load user data!'
          );
          setIsLoading(false);
        }
      } else {
        toast.error('Authentication failed. Please try again.');
        setIsLoading(false);
      }
    } catch (error) {
      console.error('Login error:', error);
      toast.error('An unexpected error occurred.');
      setIsLoading(false);
    }
  };

  if (isLoading && !isSubmitting) {
    return <ScreenLoader />;
  }
  return (
    <>
      <Head>
        <meta
          httpEquiv='Cache-Control'
          content='no-store, no-cache, must-revalidate, max-age=0'
        />
        <meta httpEquiv='Pragma' content='no-cache' />
        <meta httpEquiv='Expires' content='0' />
        <title>Login - WorkBridge</title>
      </Head>
      <Navbar />
      <div
        className='h-[400px] '
        style={{
          background: 'linear-gradient(90deg, #0F172A, #11275A)',
        }}
      >
        <div
          className={` flex flex-col items-center justify-start my-auto  mt-32 `}
        >
          <div className='min-w-[100%] sm:min-w-[27rem]  z-10 p-4 border rounded-[27px] backdrop-blur-sm bg-white/30 shadow-lg'>
            <div className='flex flex-col items-center bg-white rounded-[27px] p-8 h-full shadow-custom-deep pt-[2rem] px-[1rem]'>
              <Image
                src='/Flattened (1).svg'
                alt='img'
                width={50}
                height={50}
                className='mt-6'
              />
              <h1 className='text-[30px] mt-2'>
                work<span className='font-bold'>Bridge</span>
              </h1>
              <form
                onSubmit={handleSubmit(onSubmit)}
                className='w-full  mt-12 '
              >
                <label className='text-[14px] mb-1 mt-8 '>Email</label>
                <InputField
                  name='email'
                  type='email'
                  placeholder='Work Email'
                  register={register}
                  error={errors.email?.message}
                />
                <div className='relative w-full mt-6'>
                  <label className='text-[14px] mb-1'>Password</label>
                  <div className='relative flex items-center'>
                    <InputField
                      name='password'
                      type={passwordVisible ? 'text' : 'password'}
                      placeholder='Password'
                      register={register}
                      error={errors.password?.message && ''}
                    />
                    <button
                      type='button'
                      onClick={() => setPasswordVisible(!passwordVisible)}
                      className='absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 pointer-events-auto '
                    >
                      <EyeIcon classNames='w-4' />
                    </button>
                  </div>
                  {errors.password && (
                    <p className='text-red-500 text-xs mt-1'>
                      {errors.password.message}
                    </p>
                  )}
                </div>
                <div className='text-right'>
                  <Link
                    href={'forgot-password'}
                    className='text-black ml-auto font-semibold !text-xs !text-right my-2 w-full hover:cursor-pointer'
                  >
                    Forgot Password?
                  </Link>
                </div>

                <button
                  type='submit'
                  className='p-[10px] bg-[#0F172A] text-center text-sm text-white w-full rounded-md mt-20'
                >
                  {isSubmitting ? (
                    <BiLoaderCircle className='h-4 w-4 animate-spin mx-auto' />
                  ) : (
                    'Continue'
                  )}
                </button>
              </form>
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

export default Auth;
