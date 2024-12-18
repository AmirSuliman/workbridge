'use client'
import React, { useState } from 'react';
import WeeklyReport from './components/weeklyreport';
import QuartelyReport from './components/quartelyreport';
import Demographics from './components/Demographics';
import Yearlyreport from './components/yearlyreport';
import Evaluationlist from './components/evaluationlist';

const Reports = () => {
  const [activeTab, setActiveTab] = useState('reports'); // Manage the active tab state

  return (
    <div className=" w-full">
      {/* Tab buttons */}
      <div className="flex flex-row items-center gap-8 px-4">
        <button
          onClick={() => setActiveTab('reports')}
          className={`${
            activeTab === 'reports' ? 'text-black font-medium border-b-2 border-black' : 'text-gray-500'
          } pb-2`} 
        >
          Reports
        </button>
        <button
          onClick={() => setActiveTab('evaluations')}
          className={`${
            activeTab === 'evaluations' ? 'text-black font-medium border-b-2 border-black' : 'text-gray-500'
          } pb-2`} 
        >
          Evaluations
        </button>
      </div>

      {/* Active tab's underline */}
      <div
        className={`${
          activeTab === 'reports' ? 'border-b-2 border-gray-300' : 'border-transparent'
        } `}
      />
      <div
        className={`${
          activeTab === 'evaluations' ? 'border-b-2 border-gray-300' : 'border-transparent'
        } `}
      />

      {/* Tab content */}
      <div className="mt-4">
        {activeTab === 'reports' && (
          <div className='flex flex-col w-full gap-8'>
            <WeeklyReport/>
            <QuartelyReport/>
            <Demographics/>
           <Yearlyreport/>
          </div>
        )}

        {activeTab === 'evaluations' && (
          <div>
            <Evaluationlist/>
          </div>
        )}
      </div>
    </div>
  );
};

export default Reports;
