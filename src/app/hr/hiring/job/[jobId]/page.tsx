'use client';

import ScreenLoader from '@/components/common/ScreenLoader';
import { JobCandidates } from '@/components/JobsOpening/JobCandidates';
import Modal from '@/components/modal/Modal';
import { IMAGES } from '@/constants/images';
import axiosInstance from '@/lib/axios';
import { JobListing } from '@/types/job';
import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { FaEdit } from 'react-icons/fa';
import FullJobPreview from '../FullJobPreview';

const SingleJob = () => {
  const route = useRouter();
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { jobId } = useParams();
  const [singleJobData, setSingleJobData] = useState<JobListing | undefined>();

  useEffect(() => {
    const fetchSingleJob = async () => {
      setLoading(true);
      try {
        const { data } = await axiosInstance.get(`openPosition/${jobId}`, {
          params: {
            associations: true,
          },
        });
        setSingleJobData(data);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };
    fetchSingleJob();
  }, [jobId]);

  if (loading) {
    return <ScreenLoader />;
  }

  return (
    <main className="space-y-8">
      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)}>
          {singleJobData && <FullJobPreview jobData={singleJobData} />}
        </Modal>
      )}
      <div className="flex flex-row items-center justify-between">
        <div className="flex flex-row items-center gap-3 text-[22px] text-[#0F172A] font-semibold">
          <Image
            height={2000}
            width={2000}
            src="/jobicon.png"
            alt="img"
            className="w-5"
          />
          {singleJobData?.data.tittle || 'N/A'}
        </div>
        <button
          onClick={() => route.push(`/hr/hiring/job/edit/${jobId}`)}
          className="bg-[#0F172A] p-3 rounded-lg text-white flex flex-row gap-4 items-center"
        >
          Edit Job Posting <FaEdit />{' '}
        </button>
      </div>

      <div className="flex flex-row items-start justify-between gap-6 w-full">
        <div className="flex flex-col gap-2 p-4 border bg-white w-[70%] rounded-lg">
          <p className="text-[12px] text-gray-400">Description</p>
          <h1 className="text-[#0F172A] text-[16px] mb-6">
            {singleJobData?.data.description || 'N/A'}
          </h1>
          <hr />
          <div className="flex flex-row items-center justify-between mt-6">
            <div className="flex flex-row gap-10 items-center">
              <div className="flex flex-col ">
                <p className="text-[12px] text-gray-400">Status</p>
                <h1 className="text-[#0F172A] text-[16px] font-medium">
                  {singleJobData?.data.status || 'N/A'}
                </h1>
              </div>
              <div className="flex flex-col ">
                <p className="text-[12px] text-gray-400">Open for</p>
                <h1 className="text-[#0F172A] text-[16px] font-medium">
                  21 days
                </h1>
              </div>
            </div>
            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-[#0F172A] rounded-lg p-3 text-white text-[12px]"
            >
              See full job opening
            </button>
          </div>
        </div>

        <div className="flex flex-col p-4 border bg-white w-[30%] h-auto rounded-lg h-[27vh]">
          <div className="flex flex-row gap-3 items-center mb-4">
            <Image
              src={
                singleJobData?.data.hiringLead.profilePictureUrl ||
                IMAGES.placeholderAvatar
              }
              alt="user avatar"
              height={2000}
              width={2000}
              className="size-12 rounded-full"
            />
            <div className="flex flex-col">
              <p className="text-gray-400 font-medium text-[12px]">
                Hiring Lead
              </p>
              <h1 className="text-[16px]">{`${singleJobData?.data.hiringLead.firstName} ${singleJobData?.data.hiringLead.lastName}`}</h1>
              <p className="text-gray-400 font-medium text-[12px]">
                {singleJobData?.data.hiringLead.tittle}
              </p>
            </div>
          </div>

          {/* <p className="underline">See full hiring leads</p> */}
        </div>
      </div>
      <JobCandidates />
    </main>
  );
};

export default SingleJob;
