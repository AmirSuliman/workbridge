import { ReactNode } from 'react';

export interface IconProps {
  classNames?: string;
}
export interface SidebarNavItemProps {
  name: string;
  icon: ReactNode;
  href: string;
}

export interface SurveyProps {
  createdAt: string;
  status: string;
  sendBy: number;
  id: number;
  employeeId: number;
  departmentId: number;
}
