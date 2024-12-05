'use client';

import Candidatecomponent from '@/components/Candidatecomponent/candidate';
import CandidateInfo from '@/components/Candidatecomponent/candidateinfo';
import Jobapplied from '@/components/Candidatecomponent/jobapplied';
import ScreenLoader from '@/components/common/ScreenLoader';
import { fetchCandidateData } from '@/store/slices/candidateSlice';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { useEffect } from 'react';
import { FaArrowRight } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';

const Candidate = () => {
  const { candidateId } = useParams();
  const dispatch = useDispatch();

  const { data, loading, error } = useSelector((state) => state.candidate);
  console.log('candidate: ', data);
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
          Software Engineer
        </div>
        <a href="/hr/Hiring/interview-process">
          <button className="flex flex-row items-center gap-4 p-3 bg-[#0F172A] text-white text-[12px] rounded-lg">
            Proceed to First Round Interview <FaArrowRight />{' '}
          </button>
        </a>
      </div>
      <div className="p-6 bg-white border rounded-lg mt-8">
        {loading && <ScreenLoader />}
        {error && <p className="text-red-500">Error: {error}</p>}
        {data && (
          <>
            <Candidatecomponent data={data} />
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
