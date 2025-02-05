import { ReactNode } from 'react';
import { Department, EmployeeData, Location } from './employee';

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
  surveyEmployees: [];
  user: {
    firstName: string;
    lastName: string;
  };
  employee: EmployeeData;
  department: Department;
}

export interface EmergencyContactProps {
  employeeId: number;
  id: number;
  firstName: string | null;
  lastName: string | null;
  middleName: string | null;
  phone: string | null;
  workPhone: string | null;
  email: string;
  location: Location;
}
