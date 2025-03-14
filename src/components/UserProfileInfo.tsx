import Logout from '@/app/user/home/Logout';
import { IMAGES } from '@/constants/images';
import { getSession, useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { FaAngleDown, FaUser } from 'react-icons/fa';
import imageLoader from '../../imageLoader';

const UserProfileInfo: React.FC<
  React.ButtonHTMLAttributes<HTMLButtonElement>
> = ({ ...props }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [role, setRole] = useState<string>();
  const { data: session } = useSession();
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Get the profile picture from sessionStorage or session data
  const [profilePictureUrl, setProfilePictureUrl] = useState<string | null>(
    sessionStorage.getItem('profilePictureUrl') ||
      session?.user?.user?.profilePictureUrl ||
      null
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

  useEffect(() => {
    const fetchSession = async () => {
      const session = await getSession();
      setRole(session?.user?.role);
    };
    fetchSession();

    // Listen for changes in sessionStorage to update the profile picture
    const handleStorageChange = () => {
      const newProfilePic = sessionStorage.getItem('profilePictureUrl');
      setProfilePictureUrl(newProfilePic || null);
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
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
        className={`relative flex flex-nowrap gap-4 justify-end items-center mr-0 ${
          props.className || ''
        }`}
      >
        <Image
          loader={imageLoader}
          src={profilePictureUrl || IMAGES.placeholderAvatar}
          alt="User Avatar"
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
          <nav className="absolute right-0 mt-4 top-[100%] w-[150px] z-10 flex flex-col py-4 rounded-md shadow-md bg-white">
            <Link
              href={`${
                isUserPanel ? '/user/my-information' : '/hr/my-information'
              }`}
              className="flex gap-4 items-center text-xs px-4 py-2 bg-white/100 hover:bg-white/50"
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
