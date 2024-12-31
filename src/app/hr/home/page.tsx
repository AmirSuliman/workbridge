'use client';

import Button from '@//components/Button';
import Celebrations from '@//components/Celebrations/Celebrations';
import Companyinfo from '@//components/companyinformation/companyinformaion';
import Employeementreport from '@//components/Employementreport/employmentreport';
import LeaveRequests from '@//components/LeaveRequests/LeaveRequests';
import NewEmployees from '@//components/NewEmployees/NewEmployees';
import SingleAnnouncement from '@//components/SingleAnnouncement/SingleAnnouncement';
import Training from '@//components/Training/Training';
import WhosOut from '@//components/WhosOut/WhosOut';
import Link from 'next/link';
import { HiSpeakerphone } from 'react-icons/hi';
import { PiArrowUpRightThin } from 'react-icons/pi';

const page = () => {
  return (
    <main className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      <WhosOut />
      <section className="bg-white rounded-xl border-[1px] border-[#E0E0E0] py-4 space-y-2">
        <header className="px-4 flex items-center gap-4 justify-between">
          <h1 className="flex items-center gap-4 font-semibold text-xl mb-4">
            <HiSpeakerphone />
            Announcements
          </h1>
          <Link href="/hr/announcements-&-policies/announcements">
            <Button
              name="See All"
              icon={<PiArrowUpRightThin size={18} />}
              bg="transparent"
              textColor="black"
            />
          </Link>
        </header>
        <SingleAnnouncement/>
      </section>
      <Celebrations />
      <LeaveRequests />
      <Training />
      <NewEmployees />
      <Companyinfo />
      <Employeementreport />
    </main>
  );
};
export default page;
