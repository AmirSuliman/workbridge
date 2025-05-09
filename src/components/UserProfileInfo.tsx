import Logout from '@/app/user/home/Logout';
import { IMAGES } from '@/constants/images';
import { RootState } from '@/store/store';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { FaAngleDown, FaUser } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import imageLoader from '../../imageLoader';

const UserProfileInfo: React.FC<
  React.ButtonHTMLAttributes<HTMLButtonElement>
> = ({ ...props }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const user = useSelector((state: RootState) => state.myInfo);
  const role = user?.user?.role;
  // Get the profile picture from sessionStorage or session data
  const [profilePictureUrl, setProfilePictureUrl] = useState<string | null>(
    () => {
      if (typeof window !== 'undefined') {
        return (
          sessionStorage.getItem('profilePictureUrl') ||
          user?.user?.profilePictureUrl ||
          null
        );
      }
      return user?.user?.profilePictureUrl || null;
    }
  );

  // Handle clicks outside the dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setShowDropdown(false);
      }
    };

    if (showDropdown) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showDropdown]);

  // this effect is used to check if profilePicture is updated in my info
  useEffect(() => {
    // Listen for our custom event profilePictureUpdated
    const handleProfileUpdate = () => {
      const newProfilePic = sessionStorage.getItem('profilePictureUrl');
      setProfilePictureUrl(newProfilePic || null);
    };

    window.addEventListener('profilePictureUpdated', handleProfileUpdate);
    return () => {
      window.removeEventListener('profilePictureUpdated', handleProfileUpdate);
    };
  }, []);

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const isUserPanel = role === 'ViewOnly' || role === 'Manager';

  return (
    <div ref={dropdownRef}>
      <button
        onClick={toggleDropdown}
        {...props}
        className={`relative flex flex-nowrap justify-end items-center mr-0 ${
          props.className || ''
        }`}
      >
        <Image
          loader={imageLoader}
          src={profilePictureUrl || IMAGES.placeholderAvatar}
          alt='User Avatar'
          height={2000}
          width={2000}
          className='size-12 rounded-full'
        />
        <div className='hidden sm:block ml-2'>
          <h4 className='text-lg font-medium'>{`${
            user?.user?.firstName || ''
          } ${user?.user?.lastName || ''}`}</h4>
          <p className='text-xs opacity-60 text-left'>
            {user?.user?.role || ''}
          </p>
        </div>
        <FaAngleDown
          className={`opacity-80 ml-4 ${
            showDropdown ? 'rotate-180' : 'rotate-0'
          }`}
        />
        {showDropdown && (
          <nav className='absolute right-0 sm:mt-4 top-[100%] w-[150px] z-10 flex flex-col py-4 rounded-md shadow-md bg-white'>
            <div className='block pl-2 sm:hidden'>
              <h4 className='text-md font-medium text-left'>{`${
                user?.user?.firstName || ''
              } ${user?.user?.lastName || ''}`}</h4>
              <p className='text-xs opacity-60 text-left'>
                {user?.user?.role || ''}
              </p>
            </div>
            <Link
              href={`${
                isUserPanel ? '/user/my-information' : '/hr/my-information'
              }`}
              className='flex gap-4 items-center text-xs px-4 py-2 bg-white/100 hover:bg-white/50'
            >
              <FaUser />
              Profile
            </Link>
            <Logout />
          </nav>
        )}
      </button>
    </div>
  );
};

export default UserProfileInfo;
