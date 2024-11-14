import Image from 'next/image';
import { FaAngleDown } from 'react-icons/fa';

const UserProfileInfo = () => {
  return (
    <button className="flex flex-nowrap gap-4 justify-end items-center mr-0">
      <img
        src="https://i.pravatar.cc/150?img=12"
        alt="user avatar"
        height={2000}
        width={2000}
        className="size-12 rounded-full"
      />
      <div>
        <h4 className="text-lg font-medium">Juliette Nicolas</h4>
        <p className="text-xs opacity-60">Human Resources</p>
      </div>
      <FaAngleDown className="opacity-80 ml-4" />
    </button>
  );
};
export default UserProfileInfo;
