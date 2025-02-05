'use client';

import Button from '@/components/Button';
import Celebrations from '@/components/Celebrations/Celebrations';
import Companyinfo from '@/components/companyinformation/companyinformaion';
import NewEmployees from '@/components/NewEmployees/NewEmployees';
import SingleAnnouncement from '@/components/SingleAnnouncement/SingleAnnouncement';
import Training from '@/components/Training/Training';
import WhosOut from '@/components/WhosOut/WhosOut';
import Link from 'next/link';
import { HiSpeakerphone } from 'react-icons/hi';
import { PiArrowUpRightThin } from 'react-icons/pi';
import Evaluation from './components/evaluation';
import Newpolicyupdate from './components/newpolicyupdate';

const page = () => {
  return (
    <div className="p-6">
      <main className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <WhosOut />
        <div className="flex flex-col gap-5">
          <Evaluation />
          <Newpolicyupdate />
        </div>
        <Celebrations />
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
          <SingleAnnouncement />
        </section>
        <Training />
        <NewEmployees />
        <Companyinfo />
      </main>
    </div>
  );
};
export default page;
