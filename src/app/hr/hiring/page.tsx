'use client';
import Candidatetable from '@/components/Candidatecomponent/candidatetable';
import { AllJobsTable } from '@/components/JobsOpening/AllJobsTable';
import { useState } from 'react';
import { FaUsers } from 'react-icons/fa';

const Hiring = () => {
  const [activeTab, setActiveTab] = useState('jobOpenings');

  return (
    <main className="space-y-4">
      {/* Tab Buttons */}
      <div className="relative flex items-center gap-8 border-b border-gray-300">
        <button
          onClick={() => setActiveTab('jobOpenings')}
          className={`py-2 px-4 ${
            activeTab === 'jobOpenings'
              ? 'text-black font-semibold'
              : 'text-gray-600'
          }`}
        >
          Job Openings
        </button>
        <button
          onClick={() => setActiveTab('candidates')}
          className={`py-2 px-4 ${
            activeTab === 'candidates'
              ? 'text-black font-semibold'
              : 'text-gray-600'
          }`}
        >
          Candidates
        </button>

        <div
          className={`absolute bottom-0 h-[2px] bg-black transition-all duration-300`}
          style={{
            width: activeTab === 'jobOpenings' ? '110px' : '100px',
            left: activeTab === 'jobOpenings' ? '0' : '180px',
          }}
        />
      </div>

      {/* Conditional Rendering for Tab Content */}
      {activeTab === 'jobOpenings' ? (
        <AllJobsTable />
      ) : (
        <div className="  mt-4">
          <div className="flex flex-row items-center gap-2 text-[22px] font-medium">
            <FaUsers />
            Candidates
          </div>
          <Candidatetable />
        </div>
      )}
    </main>
  );
};

export default Hiring;
