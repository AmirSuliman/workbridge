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
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { BiLoaderCircle } from 'react-icons/bi';
import { useDispatch } from 'react-redux';
import { z } from 'zod';
import Footer from './footer';
import Navbar from './nav';

type AuthFormInputs = z.infer<typeof authSchema>;

const Auth = () => {
  const dispatch = useDispatch();
  const [passwordVisible, setPasswordVisible] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<AuthFormInputs>({
    resolver: zodResolver(authSchema),
    mode: 'onChange',
  });

  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || '';

  const getAbsoluteUrl = (url: string) => {
    try {
      // If the URL is already absolute, return it
      new URL(url);
      return url;
    } catch (error) {
      // If the URL is relative, prepend the base URL
      return `${window.location.origin}${url}`;
    }
  };
  // Check for existing session when component mounts
  useEffect(() => {
    const checkSession = async () => {
      const session = await getSession();
      if (session?.user?.accessToken) {
        try {
          // Fetch user data with the existing token
          const userData = await fetchUserData(session.user.accessToken);
          dispatch(setUser(userData));

          // Check if there's a callback URL to redirect to
          if (callbackUrl) {
            const absoluteCallbackUrl = getAbsoluteUrl(callbackUrl);
            console.log('auth-callbackUrl: ', absoluteCallbackUrl);
            router.replace(absoluteCallbackUrl);
          } else {
            // Default redirect based on role
            if (userData.role === 'Manager' || userData.role === 'ViewOnly') {
              router.replace('/user/home');
            } else {
              router.replace('/hr/home');
            }
          }
        } catch (error) {
          // If token is invalid or expired, sign out
          signOut({ redirect: false });
        }
      }
    };

    checkSession();

    // Add event listener to prevent using the back button after logout
    const handlePopState = (event: PopStateEvent) => {
      const session = getSession();
      if (!session) {
        // Prevent going back to authorized pages after logout
        window.history.pushState(null, '', window.location.pathname);
      }
    };

    window.addEventListener('popstate', handlePopState);

    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, [dispatch, router, callbackUrl]);

  // Add cache control headers
  useEffect(() => {
    // Set cache control headers
    const setNoCache = () => {
      // For modern browsers
      if (typeof window !== 'undefined') {
        document
          .getElementsByTagName('meta')[0]
          .setAttribute('http-equiv', 'Cache-Control');
        document
          .getElementsByTagName('meta')[0]
          .setAttribute(
            'content',
            'no-store, no-cache, must-revalidate, max-age=0'
          );
        document
          .getElementsByTagName('meta')[1]
          .setAttribute('http-equiv', 'Pragma');
        document
          .getElementsByTagName('meta')[1]
          .setAttribute('content', 'no-cache');

        document
          .getElementsByTagName('meta')[2]
          .setAttribute('http-equiv', 'Expires');
        document.getElementsByTagName('meta')[2].setAttribute('content', '0');
      }
    };

    setNoCache();
  }, []);

  const onSubmit = async (data: AuthFormInputs) => {
    try {
      // Attempt to sign in with the callbackUrl included
      const decodedCallbackUrl = decodeURIComponent(callbackUrl);
      const absoluteCallbackUrl = getAbsoluteUrl(decodedCallbackUrl);

      const res = await signIn('credentials', {
        email: data.email,
        password: data.password,
        redirect: false,
        callbackUrl: absoluteCallbackUrl || '',
      });

      if (!res?.ok) {
        toast.error('Invalid Email or Password!');
        return;
      }

      // Get session after sign-in
      const session = await getSession();

      if (session?.user?.accessToken) {
        try {
          // Fetch user data
          const userData = await fetchUserData(session.user.accessToken);
          console.log('user/my: ', userData);
          dispatch(setUser(userData));
          if (userData?.firstTime) {
            return router.replace('/update-password');
          }
          toast.success('Login Successful!');

          // Check if there's a callback URL to redirect to
          if (callbackUrl) {
            router.replace(absoluteCallbackUrl);
          } else {
            // Default redirect based on role
            if (userData.role === 'Manager' || userData.role === 'ViewOnly') {
              router.replace('/user/home');
            } else {
              router.replace('/hr/home');
            }
          }
        } catch (error) {
          console.error('Error fetching user data:', error);
          toast.error(
            error instanceof Error ? error.message : 'Failed to load user data!'
          );
        }
      } else {
        toast.error('Authentication failed. Please try again.');
      }
    } catch (error) {
      console.error('Login error:', error);
      toast.error('An unexpected error occurred.');
    } finally {
    }
  };

  return (
    <>
      <Head>
        <meta
          httpEquiv="Cache-Control"
          content="no-store, no-cache, must-revalidate, max-age=0"
        />
        <meta httpEquiv="Pragma" content="no-cache" />
        <meta httpEquiv="Expires" content="0" />
        <title>Login - WorkBridge</title>
      </Head>
      <Navbar />
      <div
        className="h-[400px] "
        style={{
          background: 'linear-gradient(90deg, #0F172A, #11275A)',
        }}
      >
        <div
          className={` flex flex-col items-center justify-start my-auto  mt-32 `}
        >
          <div className="min-w-[100%] sm:min-w-[27rem]  z-10 p-4 border rounded-[27px] backdrop-blur-sm bg-white/30 shadow-lg">
            <div className="flex flex-col items-center bg-white rounded-[27px] p-8 h-full shadow-custom-deep pt-[2rem] px-[1rem]">
              <Image
                src="/Flattened (1).svg"
                alt="img"
                width={50}
                height={50}
                className="mt-6"
              />
              <h1 className="text-[30px] mt-2">
                work<span className="font-bold">Bridge</span>
              </h1>
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="w-full  mt-12 "
              >
                <label className="text-[14px] mb-1 mt-8 ">Email</label>
                <InputField
                  name="email"
                  type="email"
                  placeholder="Work Email"
                  register={register}
                  error={errors.email?.message}
                />
                <div className="relative w-full mt-6">
                  <label className="text-[14px] mb-1">Password</label>
                  <div className="relative flex items-center">
                    <InputField
                      name="password"
                      type={passwordVisible ? 'text' : 'password'}
                      placeholder="Password"
                      register={register}
                      error={errors.password?.message && ''}
                    />
                    <button
                      type="button"
                      onClick={() => setPasswordVisible(!passwordVisible)}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 pointer-events-auto "
                    >
                      <EyeIcon classNames="w-4" />
                    </button>
                  </div>
                  {errors.password && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.password.message}
                    </p>
                  )}
                </div>
                <div className="text-right">
                  <Link
                    href={'forgot-password'}
                    className="text-black ml-auto font-semibold !text-xs !text-right my-2 w-full hover:cursor-pointer"
                  >
                    Forgot Password?
                  </Link>
                </div>

                <button
                  type="submit"
                  className="p-[10px] bg-[#0F172A] text-center text-sm text-white w-full rounded-md mt-20"
                >
                  {isSubmitting ? (
                    <BiLoaderCircle className="h-4 w-4 animate-spin mx-auto" />
                  ) : (
                    'Continue'
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-white mt-[400px]">
        <Footer />
      </div>
    </>
  );
};

export default Auth;
