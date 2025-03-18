'use client';
import Image from 'next/image';
import { useSession } from 'next-auth/react';
import { useParams } from 'next/navigation';
import axiosInstance from '@/lib/axios';
import { useState, useEffect } from 'react';
import axios from 'axios';

const PreviewPolicy = ({ previewData }) => {
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
      const userPolicy = previewData.employees.find(
        (emp) => emp.id === employeeId
      );
      setResponseStatus(userPolicy?.PolicyEmployee?.status || 'Not Accepted');
    }
  }, [previewData, employeeId]);

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
          <h2 className="text-[22px] font-semibold mb-2">
            {previewData.title}
          </h2>

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
{previewData?.attachment?.url ? (
  <div className="mt-4">
    <p className="text-[16px] font-semibold">Attachment:</p>
    <a
      href={previewData.attachment.url}
      target="_blank"
      rel="noopener noreferrer"
      className="text-blue-600 underline"
    >
      {previewData.attachment.fileName || 'Download Attachment'}
    </a>
  </div>
) : (
  <p className="text-gray-500">No attachment available</p>
)}


          {previewData.description && (
            <div
              className="text-black"
              dangerouslySetInnerHTML={{ __html: previewData.description }}
            ></div>
          )}
        </div>
      </div>
    </>
  );
};

export default PreviewPolicy;
