import Logout from '@/app/user/home/Logout';
import { IMAGES } from '@/constants/images';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { FaAngleDown, FaUser } from 'react-icons/fa';

const UserProfileInfo: React.FC<
  React.ButtonHTMLAttributes<HTMLButtonElement>
> = ({ ...props }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };
  const { data: session } = useSession();

  return (
    <button
      onClick={toggleDropdown}
      {...props}
      className={`relative flex flex-nowrap gap-4 justify-end items-center mr-0 ${
        props.className || ''
      }`}
    >
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
      <FaAngleDown
        className={`opacity-80 ml-4 ${
          showDropdown ? 'rotate-180' : 'rotate-0'
        }`}
      />
      {showDropdown && (
        <nav className="absolute right-0 top-[100%] z-10 flex flex-col py-4 rounded-md divide-y shadow-md bg-white">
          <Link
            href="/hr/my-information"
            className="flex gap-2 items-center text-xs px-4 py-2 bg-white/100 hover:bg-white/50"
          >
            <FaUser />
            Profile
          </Link>
          <Logout /> 
        </nav>
      )}
    </button>
  );
};

export default UserProfileInfo;
