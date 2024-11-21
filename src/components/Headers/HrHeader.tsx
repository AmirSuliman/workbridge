'use client';

import { usePathname, useRouter } from 'next/navigation';
import { PiPlusCircleBold } from 'react-icons/pi';
import BlackButton from '../Button';
import UserProfileInfo from '../UserProfileInfo';
import { GoBell } from 'react-icons/go';
import Logout from '@/app/user/home/Logout';

const HrHeader = () => {
  const pathname = usePathname(); // Get the current URL path
  const router = useRouter(); // Router instance for navigation

  const isAnnouncementPage = pathname?.startsWith('/hr/home/announcement/'); // Check if on the announcement page

  return (
    <nav className="flex items-center gap-4 bg-white px-8 py-4 border-b-[1px] border-[#E8E8E8]">
      {isAnnouncementPage ? (
        <BlackButton
          name="Back"
          icon={null}
          bg="black"
          onClick={() => router.back()} // Navigate back
        />
      ) : (
        <BlackButton
          name="Create New"
          icon={<PiPlusCircleBold size={18} />}
          bg="black"
        />
      )}

      <button className="border-[1px] border-[#E0E0E0] rounded-full size-8 flex items-center justify-center ml-auto ">
        <GoBell size={18} />
      </button>
      <UserProfileInfo />
      <Logout />
    </nav>
  );
};

export default HrHeader;
