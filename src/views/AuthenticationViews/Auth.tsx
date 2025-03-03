'use client';
import InputField from '@/components/common/InputField';
import EyeIcon from '@/components/icons/eye-icon';
import { fetchUserData } from '@/services/myInfo';
import { setUser } from '@/store/slices/myInfoSlice';
import { authSchema } from '@/validations/auth';
import { zodResolver } from '@hookform/resolvers/zod';
import { getSession, signIn } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
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

      if (!res?.ok) {
        setLoading(false);
        toast.error('Invalid Email or Password!');
        return;
      }

      // Get session after sign-in
      const session = await getSession();

      if (session?.user?.accessToken) {
        try {
          // Fetch user data
          const userData = await fetchUserData(session.user.accessToken);

          dispatch(setUser(userData));
          toast.success('Login Successful!');

          // Redirect based on role
          if (userData.role === 'Manager' || userData.role === 'ViewOnly') {
            router.push('/user/home');
          } else {
            router.push('/hr/home');
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
      setLoading(false);
    }
  };

  return (
    <>
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
                  {loading ? (
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
