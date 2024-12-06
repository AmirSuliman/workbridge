'use client';
import Candidatecomponent from '@/components/Candidatecomponent/candidate';
import CandidateInfo from '@/components/Candidatecomponent/candidateinfo';
import Jobapplied from '@/components/Candidatecomponent/jobapplied';
import InterviewLayout from '@/components/InterviewProcess/InterviewLayout';
import Summary from '@/components/InterviewProcess/Summary';
import { useState } from 'react';

const InterviewProcess = () => {
  const [activeTab, setActiveTab] = useState('jobOpenings');

  return (
    <main className="space-y-6">
      {/* Job Title Section */}
      <div className="flex items-center gap-2 text-[22px] font-medium">
        <img src="/jobicon.png" alt="img" className="w-5" />
        Software Engineer
      </div>

      <div className="p-6 bg-white border rounded-lg">
        <Candidatecomponent data={{}} />
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
      {activeTab === 'jobOpenings' && <InterviewLayout />}
      {activeTab === 'Interview Summary' && <Summary />}
      {activeTab === 'candidates' && (
        <div className="pt-6">
          <div className="p-6 bg-white rounded-lg border">
            <CandidateInfo data={{}} />
          </div>
          <div className="mt-6">
            <Jobapplied candidateId="" />
          </div>
        </div>
      )}
    </main>
  );
};

export default InterviewProcess;
