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

const HrHeader = () => {
  const router = useRouter();
  const pathname = usePathname();
  const isHomePage = pathname?.startsWith('/hr/home');
  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <nav className="relative flex items-center gap-4 bg-white px-8 py-4 border-b border-[#E8E8E8] w-full">
      {/* Create New Button with Dropdown */}
      {isHomePage ? (
        <div className="relative">
          <button
            onClick={() => setShowDropdown((prev) => !prev)}
            className="bg-[#0F172A] text-[14px] py-3 flex flex-row gap-2 px-4 rounded-[5px] text-white"
          >
            Create New <PiPlusCircleBold size={20} />
          </button>

          {/* Dropdown Menu */}
          {showDropdown && (
            <div className="absolute top-full left-0 mt-2 w-48 bg-white shadow-lg rounded-md border border-gray-200 z-50">
              <ul className="py-2">
                <li
                  onClick={() => {
                    setShowDropdown(false);
                    router.push(
                      '/hr/announcements-&-policies/announcements/create-announcment'
                    );
                  }}
                  className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer flex flex-row items-center gap-2 "
                >
                  <Image
                    loader={imageLoader}
                    src="/announcment.svg"
                    alt="img"
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
                  className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer flex flex-row items-center gap-2"
                >
                  <Image
                    loader={imageLoader}
                    src="/job.svg"
                    alt="img"
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
                  className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer flex flex-row items-center gap-2"
                >
                  <HiUsers size={16} />
                  Employee
                </li>
              </ul>
            </div>
          )}
        </div>
      ) : (
        <Button
          onClick={() => router.back()}
          icon={<FaArrowLeft />}
          name="Back"
          className="flex-row-reverse"
        />
      )}

      <Notifications />
      <UserProfileInfo />
    </nav>
  );
};

export default HrHeader;
