import Logout from '@/app/user/home/Logout';
import { IMAGES } from '@/constants/images';
import { fetchEmployeeData } from '@/store/slices/employeeInfoSlice';
import { AppDispatch, RootState } from '@/store/store';
import { getSession, useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { FaAngleDown, FaUser } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';

const UserProfileInfo: React.FC<
  React.ButtonHTMLAttributes<HTMLButtonElement>
> = ({ ...props }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [role, setRole] = useState<string>();
  const { data: session } = useSession();
  const dispatch = useDispatch<AppDispatch>();

  const { data: employeeData } = useSelector(
    (state: RootState) => state.employee
  );

  useEffect(() => {
    // Only fetch if we don't already have the data
    if (
      session?.user.accessToken &&
      session?.user.employeeId &&
      (!employeeData || !employeeData.firstName)
    ) {
      dispatch(
        fetchEmployeeData({
          accessToken: session.user.accessToken,
          userId: Number(session?.user.employeeId),
        })
      );
    } else if (!session?.user.accessToken || !session?.user.employeeId) {
      console.log('Invalid session or user ID');
    }
  }, [
    dispatch,
    session?.user.accessToken,
    session?.user.employeeId,
    employeeData,
  ]);

  useEffect(() => {
    const fetchSession = async () => {
      const session = await getSession();
      setRole(session?.user?.role);
    };

    fetchSession();
  }, []);

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const isUserPanel = role === 'ViewOnly' || role === 'Manager';
  return (
    <button
      onClick={toggleDropdown}
      {...props}
      className={`relative flex flex-nowrap gap-4 justify-end items-center mr-0 ${
        props.className || ''
      }`}
    >
      <Image
        src={employeeData?.profilePictureUrl || IMAGES.placeholderAvatar}
        alt="user avatar"
        height={2000}
        width={2000}
        className="size-12 rounded-full"
      />
      <div>
        <h4 className="text-lg font-medium">{`${
          session?.user.user.firstName || ''
        } ${session?.user.user.lastName || ''}`}</h4>
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
        <nav className="absolute right-0 mt-4 top-[100%] w-[150px] z-10 flex flex-col py-4 rounded-md  shadow-md bg-white">
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
  );
};

export default UserProfileInfo;
