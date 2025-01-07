'use client';

import {  useState } from 'react';
import { HiHome, HiUsers } from 'react-icons/hi';
import SidebarNavItem from './SidebarNavItem';
import { FaUserCircle, FaUsers, FaBullhorn } from 'react-icons/fa';
import { PiHandshakeFill } from 'react-icons/pi';
import { IoCalendarOutline } from 'react-icons/io5';
import { IoIosFolderOpen } from 'react-icons/io';
import { FiMenu, FiTrendingUp } from 'react-icons/fi';
import {  useSelector } from 'react-redux';
import { RootState } from '@/store/store';

const HrSidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [roles, setRoles] = useState<string[]>([]);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };


  const state = useSelector((state: RootState) => state.myInfo);

  console.log(state, 'Redux State');
  const userRole = useSelector((state: RootState) => state.myInfo?.user?.role);
  console.log(userRole, 'role');
  const isSuperAdmin = userRole === 'SuperAdmin' || roles.includes('SuperAdmin');


  return (
    <>
      {/* Hamburger button */}
      <button
        className="lg:hidden p-4 fixed top-0 left-0 z-20 bg-white rounded shadow-md text-4xl"
        onClick={toggleSidebar}
      >
        {!isOpen ? <FiMenu size={24} /> : 'x'}
      </button>

      <nav
        className={`flex flex-col gap-2 w-[270px] bg-white fixed top-0 bottom-0 left-0 1700px:left-auto border-r-[1px] border-[#E8E8E8] z-10 transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0`}
      >
        <h1 className="text-center px-8 wull text-2xl py-8">
          <b>work</b>Bridge
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
            {isSuperAdmin && (
              <SidebarNavItem
                name="Admins"
                icon={<FaUsers size={22} />}
                href="/hr/admins"
              />
            )}
            <SidebarNavItem
              name="Reports"
              icon={<FiTrendingUp size={22} />}
              href="/hr/Reports"
            />
          </>
      </nav>
    </>
  );
};

export default HrSidebar;
