'use client';
import Image from 'next/image';
import { useSession } from 'next-auth/react';
import { useParams } from 'next/navigation';
import axiosInstance from '@/lib/axios';
import { useState, useEffect } from 'react';

const ViewPolicy = ({ previewData }) => {
  const { data: session } = useSession();
  const { policyId } = useParams(); 
  const [loading, setLoading] = useState(false);

  const employeeId = session?.user?.employeeId; 

  const handleAcceptPolicy = async () => {
    if (!policyId || !employeeId) {
      console.error('Missing required identifiers.');
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
      <div className="bg-white mt-8">
        <div className="p-6 border rounded-[10px]">
          <h1 className="text-[32px] font-medium">{previewData?.policy?.title}</h1>
          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-6 mt-4">
            {previewData?.policy?.users && (
              <div className="flex flex-row items-center gap-1">
                {previewData.policy.users.profilePictureUrl && (
                  <Image
                    src={previewData.policy.users.profilePictureUrl}
                    alt="img"
                    width={30}
                    height={30}
                    className="rounded-full"
                  />
                )}
                <p className="text-[13px]">Posted by:</p>
                <p className="text-[13px] font-semibold">{`${previewData.policy.users.firstName} ${previewData.policy.users.lastName}`}</p>
              </div>
            )}

            <div className="flex flex-row items-center gap-1">
              <p className="text-[13px]">Effective Date:</p>
              <p className="text-[13px] font-semibold">
                {previewData?.policy?.effectiveDate?.split('T')[0]}
              </p>
            </div>
          </div>
        </div>

        <div className="mt-8 p-4">
          <h2 className="text-[22px] font-semibold mb-2">{previewData?.policy?.title}</h2>

          {previewData.file?.url && (
            <Image
              src={previewData.file.url}
              alt="policy"
              width={1200}
              height={20}
              className="my-6"
            />
          )}
{previewData?.attachment?.file?.url ? (
  <div className="mt-4">
    <p className="text-[16px] font-semibold">Attachment:</p>
    <a
      href={previewData.attachment.file.url}
      target="_blank"
      rel="noopener noreferrer"
      className="text-blue-600 underline"
    >
      {previewData.attachment.file.name || 'Download Attachment'}
    </a>
  </div>
) : (
  <p className="text-gray-500"></p>
)}
          {previewData?.policy?.description && (
            <div
              className="text-black"
              dangerouslySetInnerHTML={{ __html: previewData.policy.description }}
            ></div>
          )}
        </div>
      </div>

      {previewData?.status?.toLowerCase() === 'accepted' ? (
        <p className="text-green-600 font-semibold mt-4">Accepted</p>
      ) : (
        <button
          className="bg-green-500 text-white p-3 px-8 mt-8 rounded-lg"
          onClick={handleAcceptPolicy}
          disabled={loading}
        >
          {loading ? 'Processing...' : 'Accept'}
        </button>
      )}
    </>
  );
};

export default ViewPolicy;
