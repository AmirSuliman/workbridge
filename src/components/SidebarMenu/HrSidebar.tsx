'use client';

import { getSession } from 'next-auth/react';
import { useEffect, useState, useRef } from 'react';
import { FaBullhorn, FaUserCircle, FaUsers } from 'react-icons/fa';
import { FiMenu, FiTrendingUp, FiX } from 'react-icons/fi';
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
  const sidebarRef = useRef<HTMLDivElement>(null);

  const toggleSidebar = () => {
    setIsOpen((prevIsOpen) => !prevIsOpen);
  };
  
  const closeSidebar = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    const fetchSession = async () => {
      const session = await getSession();
      // console.log('session: ', session);
      setRole(session?.user?.role);
    };

    fetchSession();
  }, []);

  useEffect(() => {
    // Toggle body overflow based on sidebar state
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    // Cleanup function to reset overflow when component unmounts
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const isSuperAdmin = role === 'SuperAdmin';

  return (
    <>
      {/* Menu button for opening 
      <button
        className='lg:hidden p-4  top-3 left-0 z-10  '
        onClick={toggleSidebar}
        aria-label="Open sidebar"
      >
        <FiMenu size={24} />
      </button>*/}
 {!isOpen && (
    <button
      className="lg:hidden fixed top-5 left-4 z-50 bg-white  p-2 "
      onClick={toggleSidebar}
      aria-label="Open sidebar"
    >
      <FiMenu size={24} />
    </button>
  )}
      <main
        ref={sidebarRef}
        className={`flex flex-col gap-2 w-[90%] md:w-[270px] lg:w-[270px]  bg-white fixed top-0 bottom-0 left-0 border-r-[1px] border-[#E8E8E8] z-20 transition-transform duration-300 ease-in-out overflow-y-auto ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0`}
      >
        <div className="flex justify-between items-center px-4 py-4">
        
          <h1 className='text-center'>
            <Image
              className=' ml-12 mt-5 sm:ml-6'
              src='/logo.svg'
              alt='logo'
              width={150}
              height={150}
            />
          </h1>
          {/* Close button as separate element from open button */}
          {isOpen && (
            <div
              className="lg:hidden cursor-pointer p-2 absolute top-2 right-2"
              onClick={closeSidebar}
              aria-label="Close sidebar"
            >
              <FiX size={24} />
            </div>
          )}
        </div>
        
        <>
          <SidebarNavItem
            name='Home'
            icon={<HiHome size={22} />}
            href='/hr/home'
          />
          <SidebarNavItem
            name='My Information'
            icon={<FaUserCircle size={22} />}
            href='/hr/my-information'
          />
          <SidebarNavItem
            name='Employees'
            icon={<HiUsers size={22} />}
            href='/hr/employees'
          />
          <SidebarNavItem
            name='Hiring'
            icon={<PiHandshakeFill size={22} />}
            href='/hr/hiring'
          />
          <SidebarNavItem
            name='Pending Leave Requests'
            icon={<IoCalendarOutline size={22} />}
            href='/hr/leave-requests'
          />
          <SidebarNavItem
            name='Announcements & Policies'
            icon={<FaBullhorn size={22} />}
            href='/hr/announcements-&-policies/announcements'
          />
          <SidebarNavItem
            name='Files'
            icon={<IoIosFolderOpen size={22} />}
            href='/hr/files'
          />

          <SidebarNavItem
            name='Reports'
            icon={<FiTrendingUp size={22} />}
            href='/hr/evaluation-&-reports'
          />

          {/* Conditionally render Admins */}
          {isSuperAdmin && (
            <SidebarNavItem
              name='Admins'
              icon={<FaUsers size={22} />}
              href='/hr/admins'
            />
          )}
        </>
      </main>
    </>
  );
};

export default HrSidebar;