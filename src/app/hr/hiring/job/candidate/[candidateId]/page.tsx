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
import { useParams, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ProceedToNextRoundButton from '../ProceedToNextRoundButton';

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

        <ProceedToNextRoundButton />
      </div>
      <div>
        {loading && <ScreenLoader />}
        {error && <p className="text-red-500">Error: {error}</p>}
        {data && (
          <>
            <Candidatecomponent
              data={data}
              jobTitle={singleJobData?.data.tittle || ''}
            />
            {/* <div className="p-6 bg-white border rounded-lg mt-8"></div> */}
            <CandidateInfo data={data} />
          </>
        )}
      </div>

      <Jobapplied candidateId={candidateId} />
    </main>
  );
};
export default Candidate;
