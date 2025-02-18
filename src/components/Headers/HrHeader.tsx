'use client';

import { useRouter, usePathname } from 'next/navigation';
import { GoBell } from 'react-icons/go';
import { IoIosArrowRoundBack } from 'react-icons/io';
import BlackButton from '../Button';
import UserProfileInfo from '../UserProfileInfo';
import { PiPlusCircleBold } from 'react-icons/pi';

const HrHeader = () => {
  const router = useRouter();
  const pathname = usePathname();
  const isHomePage = pathname?.startsWith('/hr/home');

  return (
    <nav className="relative flex items-center gap-4 bg-white px-8 py-4 border-b border-[#E8E8E8] w-full">
      {/* Back Button (Only visible when not on the home page) */}
      {isHomePage && (
        <button className='bg-[#0F172A] text-[14px] py-3 flex flex-row gap-2 px-4 rounded-[5px] text-white'>Create New <PiPlusCircleBold size={20} /></button>
        
      )}

      {/* Notification Button */}
      <button className="border border-[#E0E0E0] rounded-full size-8 flex items-center justify-center ml-auto">
        <GoBell size={18} />
      </button>

      {/* User Profile */}
      <UserProfileInfo />
    </nav>
  );
};

export default HrHeader;
