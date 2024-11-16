'use client';
import { PiPlusCircleBold } from 'react-icons/pi';
import BlackButton from '../Button';
import UserProfileInfo from '../UserProfileInfo';
import { GoBell } from 'react-icons/go';
import Logout from '@/src/app/user/home/Logout';

const HrHeader = () => {
  return (
    <nav className="flex items-center gap-4 bg-white px-8 py-4 border-b-[1px] border-[#E8E8E8]">
      <BlackButton
        name="Create New"
        icon={<PiPlusCircleBold size={18} />}
        bg="black"
      />
      <button className="border-[1px] border-[#E0E0E0] rounded-full size-8 flex items-center justify-center ml-auto ">
        <GoBell size={18} />
      </button>
      <UserProfileInfo />
      <Logout />
    </nav>
  );
};
export default HrHeader;
