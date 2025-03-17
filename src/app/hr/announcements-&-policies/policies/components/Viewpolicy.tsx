'use client';
import Image from 'next/image';
import { useSession } from 'next-auth/react';
import { useParams } from 'next/navigation';
import axiosInstance from '@/lib/axios';
import { useState, useEffect } from 'react';
import axios from 'axios';
const ViewPolicy = ({ previewData }) => {
  const { data: session } = useSession();
  const { policyId } = useParams(); 
  const [loading, setLoading] = useState(false);
  const [responseStatus, setResponseStatus] = useState<string | null>(null); 

  const employeeId = session?.user?.employeeId; 
  const role = session?.user?.role as string | undefined;
  console.log(role, 'role');

  console.log({ policyId, employeeId, role }, 'Identifiers');
 
  useEffect(() => {
    if (previewData?.employees && employeeId) {
      const userPolicy = previewData.employees.find(emp => emp.id === employeeId);
      setResponseStatus(userPolicy?.PolicyEmployee?.status || 'Not Accepted');
    }
  }, [previewData, employeeId]);

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
  
      if (response.data && response.data.status) {
        setResponseStatus(response.data.status);
      } else {
        setResponseStatus('accepted'); 
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        console.error('Error responding to policy:', error.response?.data || error.message);
      } else if (error instanceof Error) {
        console.error('Error responding to policy:', error.message);
      } else {
        console.error('An unknown error occurred');
      }
    }
    
  };
  

  return (
    <>
      <div className="bg-white mt-8">
        <div className="p-6 border rounded-[10px]">
          <h1 className="text-[32px] font-medium">{previewData.title}</h1>
          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-6 mt-4">
            {previewData.users && (
              <div className="flex flex-row items-center gap-1">
                {previewData.users.profilePictureUrl && (
                  <Image
                    src={previewData.users.profilePictureUrl}
                    alt="img"
                    width={30}
                    height={30}
                    className="rounded-full"
                  />
                )}
                <p className="text-[13px]">Posted by:</p>
                <p className="text-[13px] font-semibold">{`${previewData.users.firstName} ${previewData.users.lastName}`}</p>
              </div>
            )}

            <div className="flex flex-row items-center gap-1">
              <p className="text-[13px]">Effective Date:</p>
              <p className="text-[13px] font-semibold">
                {previewData.effectiveDate?.split('T')[0]}
              </p>
            </div>
          </div>
        </div>

        <div className="mt-8 p-4">
          <h2 className="text-[22px] font-semibold mb-2">{previewData.title}</h2>

          {previewData.previewUrl && (
            <Image
              src={previewData.previewUrl}
              alt="policy"
              width={1200}
              height={20}
              className="my-6"
            />
          )}

          {previewData.file?.url && (
            <Image
              src={previewData.file.url}
              alt="policy"
              width={1200}
              height={20}
              className="my-6"
            />
          )}

          {previewData.description && (
            <div
              className="text-black"
              dangerouslySetInnerHTML={{ __html: previewData.description }}
            ></div>
          )}
        </div>
      </div>

      {responseStatus && typeof responseStatus === 'string' && responseStatus.toLowerCase() === 'accepted' ? (
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
