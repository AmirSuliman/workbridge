'use client'
import React from 'react';
import { usePathname, useRouter } from 'next/navigation';
import WorkBridgeLogo from '../icons/work-bridge-logo';

interface NavItem {
    label: string;
    icon: React.ReactNode;
    path: string;
}

interface SideNavigationProps {
    items: NavItem[];
    collapsed?: boolean;
}

const SideNavigation: React.FC<SideNavigationProps> = ({ items, collapsed = false }) => {
    const router = useRouter();
    const path = usePathname();

    return (
        <nav
            className={`bg-white text-dark-navy h-full transition-all border-0 border-r-[1px] border-gray-border ${collapsed ? 'w-[4rem]' : 'w-[16rem]'}`}
        >
            <div className="mt-4">
                <WorkBridgeLogo classNames="max-w-[7rem] mx-auto" />
            </div>

            <ul>
                {items.map((item, index) => (
                    <li
                        key={index}
                        className={` flex items-center p-3 ps-6 py-4 cursor-pointer transition-colors group hover:bg-dark-navy hover:text-white  ${
                            path === item.path ? 'bg-dark-navy text-white' : 'text-dark-navy'
                        }`}
                        onClick={() => router.push(item.path)}
                    >
                        <span
                            className={` group-hover:text-white ${
                                path !== item.path ? 'text-dark-navy' : 'text-white'
                            }`} // Active vs. default icon color
                        >
                            {item.icon}
                        </span>
                        {!collapsed && <span className="ml-2 text-xs">{item.label}</span>}
                    </li>
                ))}
            </ul>
        </nav>
    );
};

export default SideNavigation;
