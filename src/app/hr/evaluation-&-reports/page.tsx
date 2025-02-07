'use client';
import React, { useState } from 'react';
import WeeklyReport from './components/weeklyreport';
import QuartelyReport from './components/quartelyreport';
import Demographics from './components/Demographics';
import Yearlyreport from './components/yearlyreport';
import Evaluationlist from './components/evaluationlist';
import TabButton from '@/components/common/TabsComponent/TabButton';
import TabComponent from '@/components/common/TabsComponent/TabComponent';

const Reports = () => {
  const [activeTab, setActiveTab] = useState('reports');

  return (
    <div className="w-full">
      {/* Tab Navigation */}
      <div className="relative">
        <div className="flex flex-row items-center gap-10 px-4">
          <TabButton
            isRootTab={true}
            name="Reports"
            href={`/hr/evaluation-&-reports?tab=0`}
          />

          <TabButton
            name="Evaluations"
            href={`/hr/evaluation-&-reports?tab=1`}
          />
        </div>
        {/* Full-width line */}
        <div className="absolute bottom-0 w-full h-[1px] bg-gray-300"></div>
      </div>

      {/* Tab Content */}
      <div className="mt-8">
        <TabComponent index="0" isRootTab={true}>
          <div className="flex flex-col w-full gap-8">
            <WeeklyReport />
            <QuartelyReport />
            <Demographics />
            <Yearlyreport />
          </div>
        </TabComponent>
        <TabComponent index="1">
          <Evaluationlist />
        </TabComponent>
      </div>
    </div>
  );
};

export default Reports;
