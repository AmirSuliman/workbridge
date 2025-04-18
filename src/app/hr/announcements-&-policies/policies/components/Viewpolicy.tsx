'use client';
import axiosInstance from '@/lib/axios';
import { RootState } from '@/store/store';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { useState } from 'react';
import { useSelector } from 'react-redux';

const ViewPolicy = ({ previewData }) => {
  const { policyId } = useParams();
  const [loading, setLoading] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const user = useSelector((state: RootState) => state.myInfo);

  const employeeId = user?.user?.employeeId;

  const handleAcceptPolicy = async () => {
    if (!policyId || !employeeId || !isChecked) {
      console.error('Missing required identifiers or checkbox not checked.');
      return;
    }

    setLoading(true);
    try {
      const response = await axiosInstance.put(
        `/policy/${policyId}/employees/${employeeId}/respond`,
        { status: 'accepted' }
      );
      console.log('API Response:', response.data);
      window.location.reload(); // Refresh to reflect status update
    } catch (error) {
      console.error('Error responding to policy:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className='bg-white mt-8'>
        <div className='p-6 border rounded-[10px]'>
          <h1 className='text-[32px] font-medium'>
            {previewData?.policy?.title}
          </h1>
          <div className='flex flex-col sm:flex-row items-center gap-2 sm:gap-6 mt-4'>
            {previewData?.policy?.users && (
              <div className='flex flex-row items-center gap-1'>
                {previewData.policy.users.profilePictureUrl && (
                  <Image
                    src={previewData.policy.users.profilePictureUrl}
                    alt='img'
                    width={30}
                    height={30}
                    className='rounded-full'
                  />
                )}
                <p className='text-[13px]'>Posted by:</p>
                <p className='text-[13px] font-semibold'>{`${previewData.policy.users.firstName} ${previewData.policy.users.lastName}`}</p>
              </div>
            )}

            <div className='flex flex-row items-center gap-1'>
              <p className='text-[13px]'>Effective Date:</p>
              <p className='text-[13px] font-semibold'>
                {previewData?.policy?.effectiveDate?.split('T')[0]}
              </p>
            </div>
          </div>
        </div>

        <div className='mt-8 p-4'>
          <h2 className='text-[22px] font-semibold mb-2'>
            {previewData?.policy?.title}
          </h2>

          {previewData?.policy?.file?.url && (
            <Image
              src={previewData.policy.file.url}
              alt='Policy File'
              width={1200}
              height={20}
              className='my-6'
            />
          )}

          {/* Display Attachment */}
          {previewData?.policy?.attachment?.url ? (
            <div className='mt-4'>
              <p className='text-[16px] font-semibold'>Attachment:</p>
              <a
                href={previewData.policy.attachment.url}
                target='_blank'
                rel='noopener noreferrer'
                className='text-blue-600 underline'
              >
                {previewData.policy.attachment.fileName ||
                  'Download Attachment'}
              </a>
            </div>
          ) : (
            <p className='text-gray-500'></p>
          )}
          {previewData?.policy?.description && (
            <div
              className='text-black'
              dangerouslySetInnerHTML={{
                __html: previewData.policy.description,
              }}
            ></div>
          )}
        </div>

        {/* Checkbox */}
        {previewData?.status?.toLowerCase() !== 'accepted' && (
          <div className='flex items-center gap-2 mt-2 px-4'>
            <input
              type='checkbox'
              className='w-4 h-4'
              checked={isChecked}
              onChange={() => setIsChecked((prev) => !prev)}
            />
            <label
              className='text-sm cursor-pointer'
              onClick={() => setIsChecked((prev) => !prev)}
            >
              I have read and agree to the policy.
            </label>
          </div>
        )}
      </div>

      {/* Accept Button or Accepted Message */}
      {previewData?.status?.toLowerCase() === 'accepted' ? (
        <p className='text-green-600 font-semibold mt-4'>Accepted</p>
      ) : (
        <button
          className={`bg-green-500 text-white p-3 px-8 mt-4 rounded-lg ${
            !isChecked || loading ? 'opacity-50 cursor-not-allowed' : ''
          }`}
          onClick={handleAcceptPolicy}
          disabled={!isChecked || loading}
        >
          {loading ? 'Processing...' : 'Accept'}
        </button>
      )}
    </>
  );
};

export default ViewPolicy;
