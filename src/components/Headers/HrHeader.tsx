'use client';

import { useRouter } from 'next/navigation';
import { IoIosArrowRoundBack } from 'react-icons/io';
// import { PiPlusCircleBold } from 'react-icons/pi';
import BlackButton from '../Button';
import UserProfileInfo from '../UserProfileInfo';
import Notifications from '../Notifications/Notifications';

const HrHeader = () => {
  // const pathname = usePathname();
  const router = useRouter();
  // const isHomePage = pathname?.startsWith('/hr/home');

  return (
    <nav className="relative flex items-center gap-4 bg-white px-8 py-4 border-b-[1px] border-[#E8E8E8] 1700px:w-[calc(1700px-270px)] 1700px:mr-0 1700px:ml-auto">
      {/* {!isHomePage ? ( */}
      <BlackButton
        name="Back"
        icon={<IoIosArrowRoundBack size={25} />}
        className="flex-row-reverse"
        bg="black"
        onClick={() => router.back()} // Navigate back
      />

      <Notifications />
      <UserProfileInfo />
      {/* <Logout /> */}
    </nav>
  );
};

export default HrHeader;
