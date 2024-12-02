'use client';
import ProfileCard from '@/components/common/ProfileCard';
import Tab from '@/components/common/TabsComponent/Tab';
import TabPanel from '@/components/common/TabsComponent/TabPanel';
import TabsContainer from '@/components/common/TabsComponent/TabsContainer';
import DocumentSection from '@/components/UserInformation/DocumentSection';
import EmergencySection from '@/components/UserInformation/EmergencySection';
import EmploymentSection from '@/components/UserInformation/EmploymentSection';
import NotesSection from '@/components/UserInformation/NotesSection';
import TimeOffSection from '@/components/UserInformation/TimeOffSection';
import UserInfoSection from '@/components/UserInformation/UserInfoSection';
import { Inter } from 'next/font/google';
import { useParams } from 'next/navigation';
import { useMemo } from 'react';

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  style: ['normal', 'italic'],
  display: 'swap',
});
const MyInformation = () => {
  const UserInfoSectionMemo = useMemo(() => <UserInfoSection />, []);
  const { empId } = useParams();
  return (
    <section className={`p-4 h-full  ${inter.className}`}>
      <ProfileCard />
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
          {!empId && (
            <Tab
              index={5}
              tabStyles="text-xs px-[3%] py-3 text-dark-navy  whitespace-nowrap "
              activeTabStyle="font-semibold border-b-2 !border-dark-navy"
            >
              Notes
            </Tab>
          )}
        </div>
        <div>
          <TabPanel index={0}>{UserInfoSectionMemo}</TabPanel>
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
          {!empId && (
            <TabPanel index={5}>
              <NotesSection />
            </TabPanel>
          )}
        </div>
      </TabsContainer>
    </section>
  );
};

export default MyInformation;
