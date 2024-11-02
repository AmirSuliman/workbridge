import { PiPlusCircleBold } from 'react-icons/pi';
import BlackButton from '../BlackButton';
import UserProfileInfo from '../UserProfileInfo';

const HrHeader = () => {
  return (
    <nav className="flex  bg-white px-8 py-4 border-b-[1px] border-[#E8E8E8]">
      <BlackButton name="Create New" icon={<PiPlusCircleBold size={18} />} />
      <UserProfileInfo />
    </nav>
  );
};
export default HrHeader;
