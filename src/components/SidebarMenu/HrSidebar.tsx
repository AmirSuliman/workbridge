'use client';

import { getSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { FaBullhorn, FaUserCircle, FaUsers } from 'react-icons/fa';
import { FiMenu, FiTrendingUp } from 'react-icons/fi';
import { HiHome, HiUsers } from 'react-icons/hi';
import { IoIosFolderOpen } from 'react-icons/io';
import { IoCalendarOutline } from 'react-icons/io5';
import { PiHandshakeFill } from 'react-icons/pi';
import SidebarNavItem from './SidebarNavItem';
import Image from 'next/image';
import imageLoader from '../../../imageLoader';
const HrSidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [role, setRole] = useState<string>();

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const fetchSession = async () => {
      const session = await getSession();
      // console.log('session: ', session);
      setRole(session?.user?.role);
    };

    fetchSession();
  }, []);

  const isSuperAdmin = role === 'SuperAdmin';

  return (
    <>
      {/* Hamburger button */}
      <button
        className="lg:hidden p-4 fixed top-0 left-0 z-20 bg-white rounded shadow-md text-4xl"
        onClick={toggleSidebar}
      >
        {!isOpen ? <FiMenu size={24} /> : 'x'}
      </button>

      <main
        className={`flex flex-col gap-2 w-[270px] bg-white fixed top-0 bottom-0 left-0 1700px:left-auto border-r-[1px] border-[#E8E8E8] z-10 transition-transform duration-300 overflow-y-auto ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0`}
      >
        <h1 className="text-center px-8 text-2xl py-8">
          <Image src="/logo.svg" alt="logo" width={150} height={150} />
        </h1>
        <>
          <SidebarNavItem
            name="Home"
            icon={<HiHome size={22} />}
            href="/hr/home"
          />
          <SidebarNavItem
            name="My Information"
            icon={<FaUserCircle size={22} />}
            href="/hr/my-information"
          />
          <SidebarNavItem
            name="Employees"
            icon={<HiUsers size={22} />}
            href="/hr/employees"
          />
          <SidebarNavItem
            name="Hiring"
            icon={<PiHandshakeFill size={22} />}
            href="/hr/hiring"
          />
          <SidebarNavItem
            name="Leave Requests"
            icon={<IoCalendarOutline size={22} />}
            href="/hr/leave-requests"
          />
          <SidebarNavItem
            name="Announcements & Policies"
            icon={<FaBullhorn size={22} />}
            href="/hr/announcements-&-policies/announcements"
          />
          <SidebarNavItem
            name="Files"
            icon={<IoIosFolderOpen size={22} />}
            href="/hr/files"
          />
          {/* Conditionally render Admins */}

          <SidebarNavItem
            name="Reports"
            icon={<FiTrendingUp size={22} />}
            href="/hr/evaluation-&-reports"
          />
          {isSuperAdmin && (
            <SidebarNavItem
              name="Admins"
              icon={<FaUsers size={22} />}
              href="/hr/admins"
            />
          )}
        </>
      </main>
    </>
  );
};

export default HrSidebar;
