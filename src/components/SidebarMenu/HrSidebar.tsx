'use client';

import { useEffect, useState } from 'react';
import { HiHome, HiUsers } from 'react-icons/hi';
import SidebarNavItem from './SidebarNavItem';
import { FaUserCircle, FaUsers, FaBullhorn } from 'react-icons/fa';
import { PiHandshakeFill } from 'react-icons/pi';
import { IoCalendarOutline } from 'react-icons/io5';
import { IoIosFolderOpen } from 'react-icons/io';
import { FiMenu, FiTrendingUp } from 'react-icons/fi';
import { getUserRoles } from '@/services/authService';
import toast from 'react-hot-toast';

interface Role {
  id: number;
  name: string;
  Permissions: any[]; // Define more precise types as needed
}

const HrSidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [roles, setRoles] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const userRoles: Role[] = await getUserRoles();
        const roleNames = userRoles.map((role) => role.name);
        setRoles(roleNames);
        console.log(roleNames, 'Fetched Roles');
      } catch (error) {
        toast.error('Failed to fetch roles');
      } finally {
        setIsLoading(false);
      }
    };
    fetchRoles();
  }, []);

  const isSuperAdmin = roles.includes('SuperAdmin');
  const isAdmin = roles.includes('Admin');
  const isViewOnly = roles.includes('ViewOnly');

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
        {!isLoading && (
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
              name="Files"
              icon={<IoIosFolderOpen size={22} />}
              href="/hr/files"
            />
            {/* Show additional items for Admin and SuperAdmin */}
            {!isViewOnly && (
              <>
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
            )}
          </>
        )}
      </nav>
    </>
  );
};

export default HrSidebar;
