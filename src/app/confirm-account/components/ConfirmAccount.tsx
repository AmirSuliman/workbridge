'use client';
import WorkBridgeLogo from '@/components/icons/work-bridge-logo';
import { API_ROUTES } from '@/constants/apiRoutes';
import axiosInstance from '@/lib/axios';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { BiLoaderCircle } from 'react-icons/bi';

const ConfirmAccount = () => {
  const [loading, setLoading] = useState(true);
  const [verificationStatus, setVerificationStatus] = useState<
    'success' | 'error' | 'alreadyActivated' | null
  >(null);
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get('token');

  useEffect(() => {
    if (!token) {
      setVerificationStatus('error');
      setLoading(false);
      return;
    }

    axiosInstance
      .post(API_ROUTES.CONFIRM_ACCOUNT, { token })
      .then(() => {
        setVerificationStatus('success');
      })
      .catch((error) => {
        const status = error.response?.status;
        if (status === 409) {
          setVerificationStatus('alreadyActivated');
        } else {
          toast.error(
            error.response?.data?.message ?? 'Account Confirmation Failed!'
          );
          setVerificationStatus('error');
        }
      })
      .finally(() => {
        setLoading(false);
      });
  }, [token]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <BiLoaderCircle className="h-8 w-8 animate-spin text-dark-navy" />
      </div>
    );
  }

  return (
    <div
      className={` flex flex-col items-center justify-center h-screen bg-gray-100`}
    >
      <div className="max-w-[90%] min`-w-[26rem] sm:max-w-[70%]">
        <div className="flex flex-col bg-gray-100">
          <div className="py-12 flex flex-col items-center bg-white shadow-custom-deep px-8">
            <WorkBridgeLogo classNames="max-w-[14rem] mb-8" />
            {verificationStatus === 'success' && (
              <>
                <h3 className="text-lg font-semibold text-green-500">
                  Account Confirmed Successfully!
                </h3>
                <p className="text-md text-dark-gray mt-4 text-center">
                  Your account has been successfully verified. You can now log
                  in.
                </p>
                <button
                  onClick={() => router.push('/sign-in')}
                  className="mt-6 px-4 py-2 bg-dark-navy text-white rounded-md"
                >
                  Go to Login
                </button>
              </>
            )}
            {verificationStatus === 'alreadyActivated' && (
              <>
                <h3 className="text-lg font-semibold text-blue-500">
                  Account Already Activated
                </h3>
                <p className="text-md text-dark-gray mt-4 text-center">
                  Your account is already activated. You can go to the login
                  screen.
                </p>
                <button
                  onClick={() => router.push('/sign-in')}
                  className="mt-6 px-4 py-2 bg-dark-navy text-white rounded-md"
                >
                  Go to Login
                </button>
              </>
            )}
            {verificationStatus === 'error' && (
              <>
                <h3 className="text-lg font-semibold text-red-500">
                  Account Confirmation Failed
                </h3>
                <p className="text-md text-dark-gray mt-4 text-center">
                  The confirmation link is invalid or expired. Please request a
                  new confirmation link.
                </p>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmAccount;
