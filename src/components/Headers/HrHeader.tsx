'use client';

import { useRouter } from 'next/navigation';
import { GoBell } from 'react-icons/go';
import { IoIosArrowRoundBack } from 'react-icons/io';
// import { PiPlusCircleBold } from 'react-icons/pi';
import BlackButton from '../Button';
import UserProfileInfo from '../UserProfileInfo';

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
      {/* ) : (
      //   <BlackButton
      //     name="Create New"
      //     icon={<PiPlusCircleBold size={18} />}
      //     bg="black"
      //   />
      // )}
      */}

      <button className="border-[1px] border-[#E0E0E0] rounded-full size-8 flex items-center justify-center ml-auto ">
        <GoBell size={18} />
      </button>
      <UserProfileInfo />
      {/* <Logout /> */}
    </nav>
  );
};

export default HrHeader;
