'use client';
import InputField from '@/components/common/InputField';
import EyeIcon from '@/components/icons/eye-icon';
import GoogleLogo from '@/components/icons/google-logo';
import WorkBridgeLogo from '@/components/icons/work-bridge-logo';
import { RootState } from '@/store/store';
import { authSchema } from '@/validations/auth';
import { zodResolver } from '@hookform/resolvers/zod';
import { signIn } from 'next-auth/react';
import { Lato } from 'next/font/google';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { BiLoaderCircle } from 'react-icons/bi';
import { useDispatch, useSelector } from 'react-redux';
import { z } from 'zod';

const lato = Lato({
  subsets: ['latin'], // Define subsets as needed
  weight: ['400', '700'], // Choose weights (e.g., 400 for normal, 700 for bold)
});

type AuthFormInputs = z.infer<typeof authSchema>;

const Auth = () => {
  const dispatch = useDispatch();
  const authState = useSelector((state: RootState) => state.auth);
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
    console.log(data, 'Data');
    setLoading(true);
    const res = await signIn('credentials', {
      email: data.email,
      password: data.password,
      redirect: false,
    });
    console.log(res);

    if (res && res.ok) {
      toast.success('Login Successfull!');
      setLoading(false);
      return router.push('/hr/home');
    } else {
      setLoading(false);
      toast.error('Invalid Email or Password!');
    }
    // dispatch(login({ email: data.email, password: data.password }) as any);
  };

  // useEffect(() => {
  //   const checkSession = async () => {
  //     const session: any = await getSession();
  //     if (session) {
  //       // Redirect based on user role
  //       console.log(session, "session");
  //       if (session.user?.role === "Admin") {
  //         router.push("/user/home");
  //       } else {
  //         router.push("/HR/dashboard");
  //       }
  //     }

  //   };

  //   checkSession();
  // }, [router]);

  return (
    <div
      className={`${lato.className} flex flex-col items-center justify-center my-auto h-[100%]  bg-gray-100`}
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
              type="text"
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
          <p className="text-black text-xs w-full mt-3 ms-[1px]">
            Don &apos;t have an account?{' '}
            <Link href={'/sign-up'} className="text-blue-base">
              {' '}
              Sign Up
            </Link>
          </p>

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
