import SideNavigation from '@/src/components/common/SideNavigation';
import HomeIcon from '@/src/components/icons/home-icon';
import UserIcon from '@/src/components/icons/user-icon';
import EmployeesIcon from '@/src/components/icons/employees-icon';
import FileIcon from '@/src/components/icons/file-icon';
import UserProfileInfo from '@/src/components/UserProfileInfo';
import { GoBell } from 'react-icons/go';

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
    <section className="flex h-screen w-full">
      <SideNavigation items={navItems}></SideNavigation>
      <div className="flex flex-col flex-1">
        <header className=" bg-white border-0 border-b-[1px] border-gray-border flex  items-center py-2 px-3">
          {/* Header */}
          <button className="border-[1px] border-[#E0E0E0] rounded-full size-8 mr-3 flex items-center justify-center ml-auto ">
            <GoBell size={18} />
          </button>
          <UserProfileInfo />
        </header>
        <div className="flex-1 overflow-y-scroll ">{children}</div>
      </div>
    </section>
  );
}
