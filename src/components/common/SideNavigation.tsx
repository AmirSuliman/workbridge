'use client';
import React, { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import WorkBridgeLogo from '../icons/work-bridge-logo';
import { IoClose } from 'react-icons/io5';
import eventEmitter from '@/utils/eventEmitter';
import { EventTypes } from '@/types/events';

interface NavItem {
  label: string;
  icon: React.ReactNode;
  path: string;
}

interface SideNavigationProps {
  items: NavItem[];
  collapsed?: boolean;
}

const SideNavigation: React.FC<SideNavigationProps> = ({
  items,
  collapsed = false,
}) => {
  const router = useRouter();
  const path = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    eventEmitter.on(EventTypes.Toggle_Navbar, toggleSidebar);
    return () => {
      eventEmitter.off(EventTypes.Toggle_Navbar, () => {});
    };
  }, []);

  return (
    <nav
      className={`bg-white text-dark-navy h-full  border-0 border-r-[1px] border-gray-border  w-[90%] absolute  sm:relative  sm:translate-x-0 transition-transform duration-300 ease-in-out  sm:w-[16rem] ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      }     `}
    >
      <div className="flex justify-end mt-5 mr-4 sm:hidden">
        <IoClose className="w-6" onClick={() => toggleSidebar()} />
      </div>
      <div className="mt-4">
        <WorkBridgeLogo classNames="max-w-[7rem] mx-auto" />
      </div>

      <ul>
        {items.map((item, index) => (
          <li
            key={index}
            className={` flex items-center p-3 ps-6 py-4 cursor-pointer transition-colors duration-75 group hover:bg-dark-navy  hover:text-white  ${
              path === item.path ? 'bg-dark-navy text-white' : 'text-dark-navy'
            }`}
            onClick={() => {
              router.push(item.path);
              toggleSidebar();
            }}
          >
            <span
              className={` group-hover:text-white ${
                path !== item.path ? 'text-dark-navy' : 'text-white'
              }`} // Active vs. default icon color
            >
              {item.icon}
            </span>
            {!collapsed && (
              <span className="mx-2 text-xs whitespace-nowrap">
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default SideNavigation;
