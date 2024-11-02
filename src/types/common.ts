import { ReactNode } from 'react';

export interface IconProps {
  classNames?: string;
}

export interface SidebarNavItemProps {
  name: string;
  icon: ReactNode;
  href: string;
}
