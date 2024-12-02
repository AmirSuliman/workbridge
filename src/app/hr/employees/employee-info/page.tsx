'use client';

import Tab from '@/components/common/TabsComponent/Tab';
import TabPanel from '@/components/common/TabsComponent/TabPanel';
import TabsContainer from '@/components/common/TabsComponent/TabsContainer';
import DocumentSection from '@/components/UserInformation/DocumentSection';
import EmergencySection from '@/components/UserInformation/EmergencySection';
import EmploymentSection from '@/components/UserInformation/EmploymentSection';
import TimeOffSection from '@/components/UserInformation/TimeOffSection';
import { useMemo } from 'react';
import { EmployeeProfileCard } from '../components/employee-profile-card';
import { EmployeeInformation } from '../components/EmployeeInformation';

const Page = () => {
  const employeeInformation = useMemo(() => <EmployeeInformation />, []);

  return (
    <section className={`p-4 h-full`}>
      <EmployeeProfileCard />
      <TabsContainer containerClasses="my-1 pb-2 md:pb-4">
        <div className="flex gap-0  my-2 border-b-[1px] border-gray-border overflow-x-auto ">
          <Tab
            index={0}
            tabStyles="text-xs px-[3%] py-3 text-dark-navy  whitespace-nowrap "
            activeTabStyle="font-semibold border-b-2 !border-dark-navy"
          >
            Personal
          </Tab>
          <Tab
            index={1}
            tabStyles="text-xs px-[3%] py-3 text-dark-navy  whitespace-nowrap "
            activeTabStyle="font-semibold border-b-2 !border-dark-navy"
          >
            Employment
          </Tab>
          <Tab
            index={2}
            tabStyles="text-xs px-[3%] py-3 text-dark-navy  whitespace-nowrap "
            activeTabStyle="font-semibold border-b-2 !border-dark-navy"
          >
            Time Off{' '}
          </Tab>
          <Tab
            index={3}
            tabStyles="text-xs px-[3%] py-3 text-dark-navy  whitespace-nowrap "
            activeTabStyle="font-semibold border-b-2 !border-dark-navy"
          >
            Documents
          </Tab>
          <Tab
            index={4}
            tabStyles="text-xs px-[3%] py-3 text-dark-navy  whitespace-nowrap "
            activeTabStyle="font-semibold border-b-2 !border-dark-navy"
          >
            Emergency
          </Tab>
        </div>
        <div>
          <TabPanel index={0}>{employeeInformation}</TabPanel>
          <TabPanel index={1}>
            <EmploymentSection />
          </TabPanel>
          <TabPanel index={2}>
            <TimeOffSection />
          </TabPanel>
          <TabPanel index={3}>
            <DocumentSection />
          </TabPanel>
          <TabPanel index={4}>
            <EmergencySection />
          </TabPanel>
        </div>
      </TabsContainer>
    </section>
  );
};

export default Page;
