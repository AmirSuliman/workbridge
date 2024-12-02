'use client';

import { HiHome, HiUsers } from 'react-icons/hi';
import SidebarNavItem from './SidebarNavItem';
import { FaUserCircle, FaUsers } from 'react-icons/fa';
import { PiHandshakeFill } from 'react-icons/pi';
import { IoCalendarOutline } from 'react-icons/io5';
import { IoIosFolderOpen } from 'react-icons/io';
import { useState } from 'react';
import { FiMenu } from 'react-icons/fi';

const HrSidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };
  return (
    <>
      {/* Hamburger button */}
      <button
        className="md:hidden p-4 fixed top-0 left-0 z-20"
        onClick={toggleSidebar}
      >
        <FiMenu size={24} />
      </button>

      <nav
        className={`flex flex-col gap-2 w-[300px] bg-white fixed top-0 bottom-0 left-0 border-r-[1px] border-[#E8E8E8] z-10 transition-transform duration-300 ${isOpen ? 'translate-x-0' : '-translate-x-full'
          } md:translate-x-0`}
      >
        <h1 className="text-center px-8 wull text-2xl py-8">
          <b>work</b>Bridge
        </h1>
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
          href="/hr/Hiring"
        />
        <SidebarNavItem
          name="Leave Requests"
          icon={<IoCalendarOutline size={22} />}
          href="/hr/leave-requests"
        />
        <SidebarNavItem
          name="Files"
          icon={<IoIosFolderOpen size={22} />}
          href="/hr/files"
        />
        <SidebarNavItem
          name="Admins"
          icon={<FaUsers size={22} />}
          href="/hr/admins"
        />
      </nav>
    </>
  );
};
export default HrSidebar;
