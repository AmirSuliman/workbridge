'use client';

import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { HiUsers } from 'react-icons/hi';
import { PiPlusCircleBold } from 'react-icons/pi';
import Notifications from '../Notifications/Notifications';
import UserProfileInfo from '../UserProfileInfo';
import imageLoader from '../../../imageLoader';
import Button from '../Button';
import { FaArrowLeft } from 'react-icons/fa';
import ButtonWithNav from '../common/ButtonWithNav';

const HrHeader = () => {
  const router = useRouter();
  const pathname = usePathname();
  const isHomePage = pathname?.startsWith('/hr/home');
  const [showDropdown, setShowDropdown] = useState(false);
  const [windowWidth, setWindowWidth] = useState<number | null>(null);

  useEffect(() => {
    // Set the window width on component mount
    setWindowWidth(window.innerWidth);

    // Optionally, add a resize event listener if you want to update the width on window resize
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);

    // Cleanup the event listener on component unmount
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <nav className='sticky top-0 flex flex-wrap-reverse  items-center gap-4 bg-white px-4 sm:px-8 py-4 border-b border-[#E8E8E8] z-10'>
      {/* Create New Button with Dropdown */}
      {isHomePage ? (
        <>
          <div className='relative'>
            <Button
              onClick={() => setShowDropdown((prev) => !prev)}
              className='!font-medium !text-xs sm:!text-sm'
              name='Create New'
              icon={<PiPlusCircleBold size={20} />}
            />

            {/* Dropdown Menu */}
            {showDropdown && (
              <div className='absolute top-full left-0 mt-2 w-48 bg-white shadow-lg rounded-md border border-gray-200 z-50'>
                <ul className='py-2'>
                  <li
                    onClick={() => {
                      setShowDropdown(false);
                      router.push(
                        '/hr/announcements-&-policies/announcements/create-announcment'
                      );
                    }}
                    className='px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer flex flex-row items-center gap-2 '
                  >
                    <Image
                      loader={imageLoader}
                      src='/announcment.svg'
                      alt='img'
                      width={13}
                      height={13}
                    />
                    Announcement
                  </li>
                  <li
                    onClick={() => {
                      setShowDropdown(false);
                      router.push('/hr/hiring/create-job');
                    }}
                    className='px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer flex flex-row items-center gap-2'
                  >
                    <Image
                      loader={imageLoader}
                      src='/job.svg'
                      alt='img'
                      width={13}
                      height={13}
                    />
                    Job Posting
                  </li>
                  <li
                    onClick={() => {
                      setShowDropdown(false);
                      router.push('/hr/employees/create-employee');
                    }}
                    className='px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer flex flex-row items-center gap-2'
                  >
                    <HiUsers size={16} />
                    Employee
                  </li>
                </ul>
              </div>
            )}
          </div>
          <ButtonWithNav
            href='employees/charter'
            label='See Employee Charter'
          />
        </>
      ) : (
        <Button
          onClick={() => router.back()}
          icon={<FaArrowLeft size={20} />}
          name={windowWidth !== null && windowWidth >= 640 ? 'Back' : ''}
          className='flex-row-reverse w-10 h-10 sm:w-auto sm:h-auto ml-[50px] md:ml-[30px] lg:ml-0 rounded-full sm:rounded-md'
        />
      )}

      <Notifications />
      <UserProfileInfo />
    </nav>
  );
};

export default HrHeader;
