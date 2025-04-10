'use client';

import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';
import { HiUsers } from 'react-icons/hi';
import { PiPlusCircleBold } from 'react-icons/pi';
import Notifications from '../Notifications/Notifications';
import UserProfileInfo from '../UserProfileInfo';
import imageLoader from '../../../imageLoader';
import Button from '../Button';
import { FaArrowLeft } from 'react-icons/fa';
import Link from 'next/link';
import { GoArrowUpRight } from 'react-icons/go';

const HrHeader = () => {
  const router = useRouter();
  const pathname = usePathname();
  const isHomePage = pathname?.startsWith('/hr/home');
  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <nav className='relative flex flex-wrap-reverse items-center gap-4 bg-white px-8 py-4 border-b border-[#E8E8E8] w-full'>
      {/* Create New Button with Dropdown */}
      {isHomePage ? (
        <>
          <div className='relative'>
            <Button
              onClick={() => setShowDropdown((prev) => !prev)}
              className='!font-mdium !text-xs'
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
          <Link href='employees/charter'>
            <Button
              bg='#00B87D'
              className='!font-mdium !text-xs'
              name='See Employee Charter'
              icon={<GoArrowUpRight size={20} />}
            />
          </Link>
        </>
      ) : (
        <Button
          onClick={() => router.back()}
          icon={<FaArrowLeft size={20} />}
          name={window.innerWidth >= 640 ? 'Back' : ''}
          className="flex-row-reverse w-10 h-10 sm:w-auto sm:h-auto ml-[30px] md:ml-[30px] lg:ml-0 rounded-full sm:rounded-md"
        />
      )}

      <Notifications />
      <UserProfileInfo />
    </nav>
  );
};

export default HrHeader;
