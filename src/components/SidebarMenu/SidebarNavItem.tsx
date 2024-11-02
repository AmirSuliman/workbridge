'use client';

import { SidebarNavItemProps } from '@/src/types/common';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const SidebarNavItem: React.FC<SidebarNavItemProps> = ({
  name,
  icon,
  href,
}) => {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={`flex items-center gap-4 text-lg py-1 px-8 ${
        isActive
          ? 'bg-black text-white' // Active class styles
          : 'text-black bg-transparent hover:bg-black hover:text-white'
      }`}
    >
      {icon}
      {name}
    </Link>
  );
};
export default SidebarNavItem;
