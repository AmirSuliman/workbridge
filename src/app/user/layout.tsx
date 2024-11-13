import SideNavigation from '@/src/components/common/SideNavigation';
import HomeIcon from '@/src/components/icons/home-icon';
import UserIcon from '@/src/components/icons/user-icon';
import EmployeesIcon from '@/src/components/icons/employees-icon';
import FileIcon from '@/src/components/icons/file-icon';
import UserHeader from '@/src/components/Headers/UserHeader';
import { useEffect } from 'react';
import { getServerSession } from 'next-auth';

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
];
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <section className="flex w-full h-full overflow-hidden">
      <SideNavigation items={navItems}></SideNavigation>
      <div className="flex flex-col flex-1">
        <UserHeader />
        <div className="flex-1 overflow-y-scroll">{children}</div>
      </div>
    </section>
  );
}
