'use client';
import Candidatecomponent from '@/components/Candidatecomponent/candidate';
import CandidateInfo from '@/components/Candidatecomponent/candidateinfo';
import Jobapplied from '@/components/Candidatecomponent/jobapplied';
import InterviewLayout from '@/components/InterviewProcess/InterviewLayout';
import axiosInstance from '@/lib/axios';
import { fetchCandidateData } from '@/store/slices/candidateSlice';
import { fetchJobApplications } from '@/store/slices/jobApplicationsSlice';
import { AppDispatch, RootState } from '@/store/store';
import { JobListing } from '@/types/job';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const InterviewProcess = () => {
  const searchParams = useSearchParams();
  const dispatch = useDispatch<AppDispatch>();

  const [activeTab, setActiveTab] = useState('jobOpenings');
  const [singleJobData, setSingleJobData] = useState<JobListing | undefined>();

  const candidateId = searchParams?.get('candidate');
  const jobId = searchParams?.get('job');

  const { data } = useSelector((state: RootState) => state.candidate);
  const jobApplication = useSelector(
    (state: RootState) => state.jobApplications
  );

  // console.log('interview- Job applications: ', jobApplication);

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

  useEffect(() => {
    const params = {
      page: 1,
      size: 100000,
      candidateId: candidateId || undefined,
      jobId: jobId || undefined,
    };
    dispatch(fetchJobApplications(params));
  }, [dispatch, candidateId, jobId]);

  return (
    <main className="space-y-6">
      {/* Job Title Section */}
      <div className="flex items-center gap-2 text-[22px] font-medium">
        <img src="/jobicon.png" alt="img" className="w-5" />
        {singleJobData?.data.tittle || ''}
      </div>

      <div className="p-6 bg-white border rounded-lg">
        <Candidatecomponent
          data={data}
          jobTitle={singleJobData?.data.tittle || ''}
        />
      </div>
      {/* Tab Navigation */}
      <nav className="relative flex items-center gap-8 border-b border-gray-300">
        <button
          onClick={() => {
            setActiveTab('Interview Summary');
          }}
          className={`py-2 px-4 ${
            activeTab === 'Interview Summary'
              ? 'text-black font-semibold border-b-2 border-black'
              : 'text-gray-600'
          }`}
        >
          Interview Summary
        </button>
        <button
          onClick={() => {
            setActiveTab('jobOpenings');
          }}
          className={`py-2 px-4 ${
            activeTab === 'jobOpenings'
              ? 'text-black font-semibold border-b-2 border-black'
              : 'text-gray-600'
          }`}
        >
          Interview Process
        </button>
        <button
          onClick={() => setActiveTab('candidates')}
          className={`py-2 px-4 ${
            activeTab === 'candidates'
              ? 'text-black font-semibold border-b-2 border-black'
              : 'text-gray-600'
          }`}
        >
          Candidate Information
        </button>
      </nav>

      {/* Conditional Rendering based on Active Tab */}
      {activeTab === 'jobOpenings' && (
        <InterviewLayout jobApplication={jobApplication} />
      )}
      {/* {activeTab === 'Interview Summary' && <Summary />} */}
      {activeTab === 'candidates' && (
        <div className="pt-6">
          <div className="p-6 bg-white rounded-lg border">
            <CandidateInfo data={data} />
          </div>
          <div className="mt-6">
            <Jobapplied candidateId={candidateId} />
          </div>
        </div>
      )}
    </main>
  );
};

export default InterviewProcess;
