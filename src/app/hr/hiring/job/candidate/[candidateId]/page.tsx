'use client';

import Candidatecomponent from '@/components/Candidatecomponent/candidate';
import CandidateInfo from '@/components/Candidatecomponent/candidateinfo';
import Jobapplied from '@/components/Candidatecomponent/jobapplied';
import ScreenLoader from '@/components/common/ScreenLoader';
import axiosInstance from '@/lib/axios';
import { fetchCandidateData } from '@/store/slices/candidateSlice';
import { AppDispatch, RootState } from '@/store/store';
import { JobListing } from '@/types/job';
import Image from 'next/image';
import Link from 'next/link';
import { useParams, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { FaArrowRight } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';

const Candidate = () => {
  const { candidateId } = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const { data, loading, error } = useSelector(
    (state: RootState) => state.candidate
  );

  const searchParams = useSearchParams();
  const jobId = searchParams?.get('job');
  const [singleJobData, setSingleJobData] = useState<JobListing | undefined>();

  useEffect(() => {
    const fetchSingleJob = async () => {
      try {
        const { data } = await axiosInstance.get(`openPosition/${jobId}`, {
          params: {
            associations: true,
          },
        });
        setSingleJobData(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchSingleJob();
  }, [jobId]);

  useEffect(() => {
    if (candidateId) {
      dispatch(fetchCandidateData(candidateId));
    }
  }, [candidateId, dispatch]);

  return (
    <main className="space-y-6">
      <div className="flex flex-row items-center justify-between">
        <div className="flex flex-row items-center gap-2 text-[22px] font-semibold">
          <Image
            width={300}
            height={150}
            src="/jobicon.png"
            alt="img"
            className="w-5"
          />
          {singleJobData?.data.tittle || ''}
        </div>

        <Link
          href={`/hr/hiring/interview-process?candidate=${candidateId}&job=${jobId}`}
          // href={`/hr/hiring/interview-process/${candidateId}`}
          className="flex flex-row items-center gap-4 p-3 bg-[#0F172A] text-white text-[12px] rounded-lg"
        >
          Proceed to First Round Interview <FaArrowRight />{' '}
        </Link>
      </div>
      <div className="p-6 bg-white border rounded-lg mt-8">
        {loading && <ScreenLoader />}
        {error && <p className="text-red-500">Error: {error}</p>}
        {data && (
          <>
            <Candidatecomponent
              data={data}
              jobTitle={singleJobData?.data.tittle || ''}
            />
            <div className="w-full h-[1.5px] bg-gray-300 mt-8" />
            <CandidateInfo data={data} />
          </>
        )}
      </div>

      <Jobapplied candidateId={candidateId} />
    </main>
  );
};
export default Candidate;
