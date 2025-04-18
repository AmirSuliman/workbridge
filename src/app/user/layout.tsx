'use client';
import { useState } from 'react';

import SideNavigation from '@/components/common/SideNavigation';
import UserHeader from '@/components/Headers/UserHeader';
import EmployeesIcon from '@/components/icons/employees-icon';
import FileIcon from '@/components/icons/file-icon';
import HomeIcon from '@/components/icons/home-icon';
import UserIcon from '@/components/icons/user-icon';
import { RootState } from '@/store/store';
import { IoCalendarOutline } from 'react-icons/io5';
import { useSelector } from 'react-redux';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [showSidbarMenu, setShowSidebarMenu] = useState(false);

  const user = useSelector((state: RootState) => state.myInfo);
  const role = user?.user?.role;
  const isManager = role === 'Manager';

  const navItems = [
    {
      label: 'Home',
      icon: <HomeIcon classNames='w-4' />,
      path: '/user/home',
    },
    {
      label: 'My Information',
      icon: <UserIcon classNames='w-4' />,
      path: '/user/my-information',
    },
    {
      label: 'Employees',
      icon: <EmployeesIcon classNames='w-4' />,
      path: '/user/employees',
    },
    {
      label: 'Files',
      icon: <FileIcon classNames='w-4' />,
      path: '/user/files',
    },

    ...(isManager
      ? [
          {
            label: 'Pending Leave Requests',
            icon: <IoCalendarOutline />,
            path: '/user/leave-requests',
          },
        ]
      : []),
  ];

  return (
    <section className='flex w-full h-full overflow-hidden'>
      <SideNavigation
        setShowSidebarMenu={setShowSidebarMenu}
        showSidbarMenu={showSidbarMenu}
        items={navItems}
      ></SideNavigation>
      <div className='flex flex-col flex-1'>
        <UserHeader setShowSidebarMenu={setShowSidebarMenu} />
        <div className='flex-1 overflow-y-scroll'>{children}</div>
      </div>
    </section>
  );
}
