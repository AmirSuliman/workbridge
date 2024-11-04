import { FaAngleDown } from 'react-icons/fa';

const UserProfileInfo = () => {
  return (
    <button className="flex flex-nowrap gap-4 justify-end items-center">
      <img
        src="https://i.pravatar.cc/150?img=12"
        alt="user avatar"
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
