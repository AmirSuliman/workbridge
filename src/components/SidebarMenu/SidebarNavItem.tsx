'use client';

import { SidebarNavItemProps } from '@/types/common';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const SidebarNavItem: React.FC<SidebarNavItemProps> = ({
  name,
  icon,
  href,
}) => {
  const pathname = usePathname();

  const isActive = pathname.startsWith(href);

  return (
    <Link
      href={href}
      className={`flex items-center gap-4 text-lg py-2 px-8 ${
        isActive
          ? 'bg-[#0F172A] text-white' 
          : 'text-black bg-transparent hover:bg-[#0F172A] hover:text-white'
      }`}
    >
      {icon}
      {name}
    </Link>
  );
};
export default SidebarNavItem;
