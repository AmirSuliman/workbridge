import { IMAGES } from '@/constants/images';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { FaAngleDown } from 'react-icons/fa';

const UserProfileInfo = () => {
  const { data: session } = useSession();

  return (
    <button className="flex flex-nowrap gap-4 justify-end items-center mr-0">
      <Image
        src={session?.user?.user?.profilePictureUrl || IMAGES.placeholderAvatar}
        alt="user avatar"
        height={2000}
        width={2000}
        className="size-12 rounded-full"
      />
      <div>
        <h4 className="text-lg font-medium">{`${
          session?.user?.user?.firstName || ''
        } ${session?.user?.user?.lastName || ''}`}</h4>
        <p className="text-xs opacity-60 text-left">
          {session?.user?.user?.role || ''}
        </p>
      </div>
      <FaAngleDown className="opacity-80 ml-4" />
    </button>
  );
};
export default UserProfileInfo;
