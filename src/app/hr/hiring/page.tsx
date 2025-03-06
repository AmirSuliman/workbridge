'use client';
import Candidatetable from '@/components/Candidatecomponent/candidatetable';
import TabButton from '@/components/common/TabsComponent/TabButton';
import TabComponent from '@/components/common/TabsComponent/TabComponent';
import { AllJobsTable } from '@/components/JobsOpening/AllJobsTable';
import { FaUsers } from 'react-icons/fa';

const Hiring = () => {
  return (
    <main className="space-y-4">
      {/* Tab Buttons */}
      <div className="relative flex items-center gap-8 border-b border-gray-300">
        <TabButton
          isRootTab={true}
          name="Job Openings"
          href={`/hr/hiring?tab=0`}
        />
        <TabButton name="Candidates" href={`/hr/hiring?tab=1`} />
      </div>

      {/* Conditional Rendering for Tab Content */}
      <TabComponent index="0" isRootTab={true}>
        <AllJobsTable />
      </TabComponent>
      <TabComponent index="1">
        <div className="  mt-4">
          <div className="flex flex-row items-center gap-2 text-[22px] font-medium">
            <FaUsers />
            Candidates
          </div>
          <Candidatetable />
        </div>
      </TabComponent>
    </main>
  );
};

export default Hiring;
