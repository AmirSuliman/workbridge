'use client';
import InputField from '@/components/common/InputField';
import EyeIcon from '@/components/icons/eye-icon';
import GoogleLogo from '@/components/icons/google-logo';
import WorkBridgeLogo from '@/components/icons/work-bridge-logo';
import axiosInstance from '@/lib/axios';
import { setUser } from '@/store/slices/myInfoSlice';
import { authSchema } from '@/validations/auth';
import { zodResolver } from '@hookform/resolvers/zod';
import { getSession, signIn } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { BiLoaderCircle } from 'react-icons/bi';
import { useDispatch } from 'react-redux';
import { z } from 'zod';

type AuthFormInputs = z.infer<typeof authSchema>;

const Auth = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AuthFormInputs>({
    resolver: zodResolver(authSchema),
    mode: 'onChange',
  });

  const router = useRouter();

  const onSubmit = async (data: AuthFormInputs) => {
    setLoading(true);

    try {
      // Attempt to sign in
      const res = await signIn('credentials', {
        email: data.email,
        password: data.password,
        redirect: false,
      });

      // If sign-in fails
      if (!res?.ok) {
        setLoading(false);
        toast.error('Invalid Email or Password!');
        return;
      }

      // Attempt to get session after sign-in
      const session = await getSession();

      // Check if session exists and has an access token
      if (session?.user?.accessToken) {
        try {
          // Fetch user data using accessToken
          const response = await axiosInstance.get('/user/my', {
            headers: { Authorization: `Bearer ${session.user.accessToken}` },
          });

          // Store user data in Redux
          dispatch(setUser(response.data.data));
          toast.success('Login Successful!');
          router.push('/hr/home');
        } catch (error) {
          console.error('Error fetching user data:', error);
          toast.error('Failed to load user data!');
        }
      } else {
        toast.error('Authentication failed. Please try again.');
      }
    } catch (error) {
      console.error('Login error:', error);
      toast.error('An unexpected error occurred.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={` flex flex-col items-center justify-center my-auto h-[100%]  bg-gray-100`}
    >
      <div className="min-w-[90%] sm:min-w-[24rem]">
        <div className="flex flex-col items-center bg-white h-full shadow-custom-deep pt-[2rem] px-[1rem]">
          <WorkBridgeLogo classNames="max-w-[12rem] mb-[1rem]" />

          <h3 className="text-lg mb-2 text-dark-gray font-semibold ">
            Welcome
          </h3>
          <p className="text-sm mb-4 text-dark-gray">
            Sign In to ISA workBridge
          </p>

          <form onSubmit={handleSubmit(onSubmit)} className="w-full">
            <InputField
              name="email"
              type="email"
              placeholder="Work Email"
              register={register}
              error={errors.email?.message}
            />
            <div className="relative w-full">
              <div className="relative flex items-center">
                <InputField
                  name="password"
                  type={passwordVisible ? 'text' : 'password'} // Toggle input type based on visibility state
                  placeholder="Password"
                  register={register}
                  error={errors.password?.message && ''}
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
                  {errors.password.message}
                </p>
              )}
            </div>
            <div className="text-right">
              <Link
                href={'forgot-password'}
                className="text-blue-base ml-auto font-semibold !text-xs !text-right my-2 w-full hover:cursor-pointer"
              >
                Forgot Password?
              </Link>
            </div>

            <button
              type="submit"
              className="p-[10px] bg-[#0F172A] text-center text-sm text-white w-full rounded-md mt-4"
            >
              {loading ? (
                <BiLoaderCircle className="h-4 w-4 animate-spin mx-auto" />
              ) : (
                'Continue'
              )}
            </button>
          </form>
          {/* <p className="text-black text-xs w-full mt-3 ms-[1px]">
            Don &apos;t have an account?{' '}
            <Link href={'/sign-up'} className="text-blue-base">
              {' '}
              Sign Up
            </Link>
          </p> */}

          <div className="flex items-center my-4 w-full">
            <hr className="flex-grow border-t-[2px] border-light-gray" />
            <span className="mx-4  text-txt-dark-gray text-sm">OR</span>
            <hr className="flex-grow border-t-[2px] border-light-gray" />
          </div>

          <button className="flex items-center gap-2 justify-center  p-[4px] mb-6 text-[#0000009E] text-xs rounded-md border border-gray-300 w-full">
            <GoogleLogo classNames="max-w-5" />
            Continue with Google
          </button>
        </div>
      </div>
    </div>
  );
};

export default Auth;
