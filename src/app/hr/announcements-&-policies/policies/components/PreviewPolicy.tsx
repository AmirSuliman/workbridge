'use client';
import Image from 'next/image';
import { useSession } from 'next-auth/react';
const PreviewPolicy = ({ previewData }) => {

  const { data: session } = useSession();
  console.log(session, 'session');
  const username = session?.user?.user?.firstName + " " + session?.user?.user?.lastName;
  console.log(username, 'username');

  return (
    <div className="bg-white mt-8">
      <div className="p-6 border rounded-[10px]">
        <h1 className="text-[32px] font-medium">{previewData.title}</h1>
        <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-6 mt-4">
         
          {previewData.users && (
            <div className="flex flex-row items-center gap-1">
              <Image
                src={previewData.users.profilePictureUrl}
                alt="img"
                width={30}
                height={30}
                className="rounded-full"
              />
              <p className="text-[13px] ">Posted by:</p>
              <p className="text-[13px] font-semibold">{`${previewData.users.firstName} ${previewData.users.lastName}`}</p>
            </div>
          )}

          <div className="flex flex-row items-center gap-1">
            <p className="text-[13px] ">Effective Date:</p>
            <p className="text-[13px] font-semibold">
              {previewData.effectiveDate?.split('T')[0]}
            </p>
          </div>
        </div>
      </div>

      <div className="mt-8 p-4">
        <h2 className="text-[22px] font-semibold mb-2">{previewData.title}</h2>

        {/* this is when we preview a policy at create time */}
        {previewData.previewUrl && (
          <Image
            src={previewData.previewUrl}
            alt="policy"
            width={1200}
            height={20}
            className="my-6"
          />
        )}

        {/* this is when we preview a fetched policy from the backend */}
        {previewData.file && (
          <Image
            src={previewData.file.url}
            alt="policy"
            width={1200}
            height={20}
            className="my-6"
          />
        )}

        {/* this is when we preview a policy at create time */}
        {previewData.description ? (
          <div
            className="text-black "
            dangerouslySetInnerHTML={{ __html: previewData.description }}
          ></div>
        ) : (
          <div
            className="text-black "
            dangerouslySetInnerHTML={{ __html: previewData.description }}
          ></div>
        )}
        {/* this is when we preview a fetched policy from the backend */}
      </div>
    </div>
  );
};

export default PreviewPolicy;
