import { FaAngleDown } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import Image from 'next/image';
import { IMAGES } from '@/constants/images';

const UserProfileInfo = () => {
  const myInfo = useSelector((state: RootState) => state.myInfo.user);
  console.log('My Info: ', myInfo);
  return (
    <button className="flex flex-nowrap gap-4 justify-end items-center mr-0">
      <Image
        src={myInfo?.profilePictureUrl || IMAGES.placeholderAvatar}
        alt="user avatar"
        height={2000}
        width={2000}
        className="size-12 rounded-full"
      />
      <div>
        <h4 className="text-lg font-medium">{`${myInfo?.firstName || ''} ${
          myInfo?.lastName || ''
        }`}</h4>
        <p className="text-xs opacity-60 text-left">{myInfo?.role || ''}</p>
      </div>
      <FaAngleDown className="opacity-80 ml-4" />
    </button>
  );
};
export default UserProfileInfo;
