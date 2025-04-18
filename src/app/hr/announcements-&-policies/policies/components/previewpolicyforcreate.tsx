'use client';
import { RootState } from '@/store/store';
import Image from 'next/image';
import { useSelector } from 'react-redux';
import imageLoader from '../../../../../../imageLoader';

const PreviewPolicy = ({ previewData }) => {
  const user = useSelector((state: RootState) => state.myInfo);

  const username = user?.user?.firstName + ' ' + user?.user?.lastName;

  return (
    <div className='bg-white mt-8'>
      <div className='p-6 border rounded-[10px]'>
        <h1 className='text-[32px] font-medium'>{previewData.title}</h1>
        <div className='flex flex-col sm:flex-row items-center gap-2 sm:gap-6 mt-4'>
          <p className='text-[13px] '>Posted by:</p>
          <p className='text-[13px] font-semibold'>{username}</p>

          <div className='flex flex-row items-center gap-1'>
            <p className='text-[13px] '>Effective Date:</p>
            <p className='text-[13px] font-semibold'>
              {previewData.effectiveDate?.split('T')[0]}
            </p>
          </div>
        </div>
      </div>

      <div className='mt-8 p-4'>
        <h2 className='text-[22px] font-semibold mb-2'>{previewData.title}</h2>

        {/* Image preview when creating a policy */}
        {previewData.previewUrl && (
          <Image
            loader={imageLoader}
            src={previewData.previewUrl}
            alt='policy'
            width={1200}
            height={20}
            className='my-6'
          />
        )}

        {/* Image preview for a fetched policy */}
        {previewData.file?.url && (
          <Image
            src={previewData.file.url}
            alt='policy'
            width={1200}
            height={20}
            className='my-6'
          />
        )}

        {/* Attachment Preview */}
        {previewData?.attachment?.file?.url ? (
          <div className='mt-4'>
            <p className='text-[16px] font-semibold'>Attachment:</p>
            <a
              href={previewData.attachment.file.url}
              target='_blank'
              rel='noopener noreferrer'
              className='text-blue-600 underline'
            >
              {previewData.attachment.file.name || 'Download Attachment'}
            </a>
          </div>
        ) : (
          <p className='text-gray-500'>No attachment available</p>
        )}

        {/* Policy Description */}
        {previewData.description && (
          <div
            className='text-black'
            dangerouslySetInnerHTML={{ __html: previewData.description }}
          ></div>
        )}
      </div>
    </div>
  );
};

export default PreviewPolicy;
