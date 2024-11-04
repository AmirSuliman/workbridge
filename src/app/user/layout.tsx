import SideNavigation from '@/src/components/common/SideNavigation';
import HomeIcon from '@/src/components/icons/home-icon';
import UserIcon from '@/src/components/icons/user-icon';
import EmployeesIcon from '@/src/components/icons/employees-icon';
import FileIcon from '@/src/components/icons/file-icon';

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
        <header className="h-14 bg-white border-0 border-b-[1px] border-gray-border">
          {/* Header */}
        </header>
        <div className="flex-1 overflow-y-scroll">{children}</div>
      </div>
    </section>
  );
}
