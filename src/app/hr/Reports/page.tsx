'use client';
import React, { useState } from 'react';
import WeeklyReport from './components/weeklyreport';
import QuartelyReport from './components/quartelyreport';
import Demographics from './components/Demographics';
import Yearlyreport from './components/yearlyreport';
import Evaluationlist from './components/evaluationlist';

const Reports = () => {
  const [activeTab, setActiveTab] = useState('reports');

  return (
    <div className="w-full">
      {/* Tab Navigation */}
      <div className="relative">
        <div className="flex flex-row items-center gap-10 px-4">
          <button
            onClick={() => setActiveTab('reports')}
            className={`relative pb-2 transition-colors duration-300 ${
              activeTab === 'reports'
                ? 'text-black font-semibold'
                : 'text-gray-500 hover:text-black'
            }`}
          >
            Reports
            {activeTab === 'reports' && (
              <span className="absolute left-0 bottom-0 w-[140%] translate-x-[-10%] h-[2.5px] bg-black" />
            )}
          </button>
          <button
            onClick={() => setActiveTab('evaluations')}
            className={`relative pb-2 transition-colors duration-300 ${
              activeTab === 'evaluations'
                ? 'text-black font-semibold'
                : 'text-gray-500 hover:text-black'
            }`}
          >
            Evaluations
            {activeTab === 'evaluations' && (
              <span className="absolute left-0 bottom-0 w-[140%] translate-x-[-10%] h-[2.5px] bg-black" />
            )}
          </button>
        </div>
        {/* Full-width line */}
        <div className="absolute bottom-0 w-full h-[1px] bg-gray-300"></div>
      </div>

      {/* Tab Content */}
      <div className="mt-8">
        {activeTab === 'reports' && (
          <div className="flex flex-col w-full gap-8">
            <WeeklyReport />
            <QuartelyReport />
            <Demographics />
            <Yearlyreport />
          </div>
        )}

        {activeTab === 'evaluations' && (
          <div>
            <Evaluationlist />
          </div>
        )}
      </div>
    </div>
  );
};

export default Reports;
