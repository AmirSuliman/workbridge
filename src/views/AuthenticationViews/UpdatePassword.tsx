import InputField from '@/components/common/InputField';
import axiosInstance from '@/lib/axios';
import { updatePassword } from '@/validations/common';
import { zodResolver } from '@hookform/resolvers/zod';
import { isAxiosError } from 'axios';
import { EyeIcon } from 'lucide-react';
import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { BiLoaderCircle } from 'react-icons/bi';
import Footer from './footer';
import Navbar from './nav';

const UpdatePassword = () => {
  const router = useRouter();
  const [passwordVisible, setPasswordVisible] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(updatePassword),
    mode: 'onChange',
  });

  const onSubmit = async (data) => {
    let accessToken;
    if (typeof window !== 'undefined') {
      accessToken = localStorage.getItem('accessToken');
    }
    const payload = {
      oldPassword: data.oldPassword,
      newPassword: data.newPassword,
    };
    try {
      if (accessToken) {
        const response = await axiosInstance.put(
          '/user/changePassword',
          payload,
          {
            headers: { Authorization: `Bearer ${accessToken}` },
          }
        );
        console.log('put pas: ', response.data);
      }
      toast.success('Password updated successfully!');
      router.replace('/sign-in');
    } catch (error) {
      console.log(error);
      if (isAxiosError(error) && error.response)
        toast.error(error.response.data.message || 'An error occured');
      else toast.error('An error occured');
    }
  };

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
          className={` flex flex-col items-center justify-start my-auto  pt-32 `}
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
              <p className='mt-4 max-w-md text-center'>
                This is your 1st time login. Please change your password to
                proceed.
              </p>
              <form onSubmit={handleSubmit(onSubmit)} className='w-full mt-4'>
                <div className='relative w-full mt-6'>
                  <label className='text-[14px] mb-1'>Old Password</label>
                  <div className='relative flex items-center'>
                    <InputField
                      name='oldPassword'
                      type={passwordVisible ? 'text' : 'password'}
                      placeholder='Password'
                      register={register}
                      error={errors.oldPassword?.message && ''}
                    />
                    <button
                      type='button'
                      onClick={() => setPasswordVisible(!passwordVisible)}
                      className='absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 pointer-events-auto '
                    >
                      <EyeIcon className='w-4' />
                    </button>
                  </div>
                  {errors.oldPassword && (
                    <p className='text-red-500 text-xs mt-1'>
                      {String(errors.oldPassword.message)}
                    </p>
                  )}
                </div>
                <div className='relative w-full mt-6'>
                  <label className='text-[14px] mb-1'>New Password</label>
                  <div className='relative flex items-center'>
                    <InputField
                      name='newPassword'
                      type={passwordVisible ? 'text' : 'password'}
                      placeholder='Password'
                      register={register}
                      error={errors.newPassword?.message && ''}
                    />
                    <button
                      type='button'
                      onClick={() => setPasswordVisible(!passwordVisible)}
                      className='absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 pointer-events-auto '
                    >
                      <EyeIcon className='w-4' />
                    </button>
                  </div>
                  {errors.newPassword && (
                    <p className='text-red-500 text-xs mt-1'>
                      {String(errors.newPassword.message)}
                    </p>
                  )}
                </div>
                {/* <div className="text-right">
                  <Link
                    href={'forgot-password'}
                    className="text-black ml-auto font-semibold !text-xs !text-right my-2 w-full hover:cursor-pointer"
                  >
                    Forgot Password?
                  </Link>
                </div> */}

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
export default UpdatePassword;
