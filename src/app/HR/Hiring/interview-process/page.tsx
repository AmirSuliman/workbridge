'use client';
import Candidatecomponent from '@/components/Candidatecomponent/candidate';
import CandidateInfo from '@/components/Candidatecomponent/candidateinfo';
import Jobapplied from '@/components/Candidatecomponent/jobapplied';
import InterviewLayout from '@/components/InterviewProcess/InterviewLayout';
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
        <Candidatecomponent />
      </div>
      {/* Tab Navigation */}
      <div className="relative flex items-center gap-8 border-b border-gray-300">
        <button
          onClick={() => {
            setActiveTab('jobOpenings');

            // navigateToPage('hr/home/interview-process');
          }}
          className={`py-2 px-4 ${
            activeTab === 'jobOpenings'
              ? 'text-black font-semibold'
              : 'text-gray-600'
          }`}
        >
          Interview Process
        </button>
        <button
          onClick={() => setActiveTab('candidates')}
          className={`py-2 px-4 ${
            activeTab === 'candidates'
              ? 'text-black font-semibold'
              : 'text-gray-600'
          }`}
        >
          Candidate Information
        </button>

        {/* Underline Indicator */}
        <div
          className={`absolute bottom-0 h-[2px] bg-black transition-all duration-300`}
          style={{
            width: activeTab === 'jobOpenings' ? '150px' : '180px',
            left: activeTab === 'jobOpenings' ? '0' : '210px',
          }}
        />
      </div>

      {/* Conditional Rendering based on Active Tab */}
      {activeTab === 'jobOpenings' ? (
        <InterviewLayout />
      ) : (
        <div className="pt-6">
          <div className="p-6 bg-white rounded-lg border">
            <CandidateInfo />
          </div>
          <div className="mt-6">
            <Jobapplied />
          </div>
        </div>
      )}
    </main>
  );
};

export default InterviewProcess;
