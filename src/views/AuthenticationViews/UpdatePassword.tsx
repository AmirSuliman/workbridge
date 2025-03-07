import { password } from '@/validations/common';
import { zodResolver } from '@hookform/resolvers/zod';
import Head from 'next/head';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { BiLoaderCircle } from 'react-icons/bi';
import Footer from './footer';
import Navbar from './nav';
import Image from 'next/image';
import InputField from '@/components/common/InputField';
import { EyeIcon } from 'lucide-react';

const UpdatePassword = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(password),
    mode: 'onChange',
  });

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
                // onSubmit={handleSubmit(onSubmit)}
                className="w-full  mt-12 "
              >
                <div className="relative w-full mt-6">
                  <label className="text-[14px] mb-1">Password</label>
                  <div className="relative flex items-center">
                    <InputField
                      name="password"
                      // type={passwordVisible ? 'text' : 'password'}
                      placeholder="Password"
                      register={register}
                      error={errors.password?.message && ''}
                    />
                    <button
                      type="button"
                      // onClick={() => setPasswordVisible(!passwordVisible)}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 pointer-events-auto "
                    >
                      {/* <EyeIcon classNames="w-4" /> */}
                    </button>
                  </div>
                  {errors.password && (
                    <p className="text-red-500 text-xs mt-1">
                      {/* {errors.password.message} */}
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
export default UpdatePassword;
