'use client';

import { useEffect, useState } from 'react';
import { getSession, useSession } from 'next-auth/react';

import SideNavigation from '@/components/common/SideNavigation';
import UserHeader from '@/components/Headers/UserHeader';
import EmployeesIcon from '@/components/icons/employees-icon';
import FileIcon from '@/components/icons/file-icon';
import HomeIcon from '@/components/icons/home-icon';
import UserIcon from '@/components/icons/user-icon';
import { IoCalendarOutline } from 'react-icons/io5';
import {  useSelector } from 'react-redux';
import { RootState } from '@/store/store';

interface EmployeeData {
  id: number;
  firstName: string;
  lastName: string;
  isManager: boolean;
}

interface InnerUser {
  email: string;
  firstName: string;
  lastName: string;
  role: string;
  employeeData?: EmployeeData;
}

interface Session {
  user: InnerUser;
}
interface User {
  employeeId: number | null;
}

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { data: session } = useSession();
  const [employeeId, setEmployeeId] = useState<User>();

    const fetchSession = async (): Promise<Session | null> => {
      const session = await getSession();
      console.log(session, 'session');
      return session;
    };
  
    useEffect(() => {
      const fetchSessionAndSetEmployeeId = async () => {
        const session = await fetchSession();
        if (session?.user?.employeeId) {
          setEmployeeId({ employeeId: session.user.employeeId });
        } else {
          setEmployeeId({ employeeId: null }); // Handle the case where employeeId is not available
        }
      };
  
      fetchSessionAndSetEmployeeId();
    }, []);
    const { data: employeeData } = useSelector(
      (state: RootState) => state.employee
    );
    console.log('employeeData:', employeeData);
    const isManager = employeeData?.isManager;

  const navItems = [
    {
      label: 'Home',
      icon: <HomeIcon classNames="w-4" />,
      path: '/user/home',
    },
    {
      label: 'My Information',
      icon: <UserIcon classNames="w-4" />,
      path: '/user/my-information',
    },
    {
      label: 'Employees',
      icon: <EmployeesIcon classNames="w-4" />,
      path: '/user/employees',
    },
    {
      label: 'Files',
      icon: <FileIcon classNames="w-4" />,
      path: '/user/files',
    },
    ...(isManager
      ? [
          {
            label: 'Leave Requests',
            icon: <IoCalendarOutline />,
            path: '/user/leave-requests',
          },
        ]
      : []),
  ];

  return (
    <section className="flex w-full h-full overflow-hidden">
      <SideNavigation items={navItems} />
      <div className="flex flex-col flex-1">
        <UserHeader />
        <div className="flex-1 overflow-y-scroll">{children}</div>
      </div>
    </section>
  );
}
