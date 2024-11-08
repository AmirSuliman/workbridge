import ProfileCard from '@/src/components/common/ProfileCard'
import Tab from '@/src/components/common/TabsComponent/Tab'
import TabPanel from '@/src/components/common/TabsComponent/TabPanel'
import TabsContainer from '@/src/components/common/TabsComponent/TabsContainer'
import DocumentSection from '@/src/components/UserInformation/DocumentSection'
import EmergencySection from '@/src/components/UserInformation/EmergencySection'
import EmploymentSection from '@/src/components/UserInformation/EmploymentSection'
import NotesSection from '@/src/components/UserInformation/NotesSection'
import TimeOffSection from '@/src/components/UserInformation/TimeOffSection'
import UserInfoSection from '@/src/components/UserInformation/UserInfoSection'
import { Inter } from 'next/font/google'
import React, { useMemo } from 'react'

const inter = Inter({
    subsets: ['latin'],
    weight: ['400', '500', '600', '700', '800'],
    style: ['normal', 'italic'],
    display: 'swap'
})
const MyInformation = () => {
    const UserInfoSectionMemo = useMemo(() => <UserInfoSection />, []);
    return (
        <section className={`p-4 h-full  ${inter.className}`}>
            <ProfileCard />
            <TabsContainer containerClasses='my-1 pb-4'>
                <div className='flex gap-0  my-2 border-b-[1px] border-gray-border'>
                    <Tab index={0} tabStyles='text-xs px-[3%] py-3 text-dark-navy  ' activeTabStyle='font-semibold border-b-2 !border-dark-navy'>Personal</Tab>
                    <Tab index={1} tabStyles='text-xs px-[3%] py-3 text-dark-navy  ' activeTabStyle='font-semibold border-b-2 !border-dark-navy'>Employment</Tab>
                    <Tab index={2} tabStyles='text-xs px-[3%] py-3 text-dark-navy  ' activeTabStyle='font-semibold border-b-2 !border-dark-navy'>Time Off </Tab>
                    <Tab index={3} tabStyles='text-xs px-[3%] py-3 text-dark-navy  ' activeTabStyle='font-semibold border-b-2 !border-dark-navy'>Documents</Tab>
                    <Tab index={4} tabStyles='text-xs px-[3%] py-3 text-dark-navy  ' activeTabStyle='font-semibold border-b-2 !border-dark-navy'>Emergency</Tab>
                    <Tab index={5} tabStyles='text-xs px-[3%] py-3 text-dark-navy  ' activeTabStyle='font-semibold border-b-2 !border-dark-navy'>Notes</Tab>
                </div>
                <div>
                    <TabPanel index={0}>{UserInfoSectionMemo}</TabPanel>
                    <TabPanel index={1}><EmploymentSection /></TabPanel>
                    <TabPanel index={2}><TimeOffSection /></TabPanel>
                    <TabPanel index={3}><DocumentSection /></TabPanel>
                    <TabPanel index={4}><EmergencySection /></TabPanel>
                    <TabPanel index={5}><NotesSection /></TabPanel>
                </div>
            </TabsContainer>

        </section>
    )
}

export default MyInformation