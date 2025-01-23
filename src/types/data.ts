import { DefaultUser } from 'next-auth';

export namespace DataTypes {
  export type UserRole = 'SuperAdmin' | 'Admin' | 'User' | 'ViewOnly';

  export enum EUserRoles {
    SUPER_ADMIN = 'SuperAdmin',
    ADMIN = 'Admin',
    USER = 'User',
    VIEW_ONLY = 'ViewOnly',
  }

  export interface User extends DefaultUser {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    roleId: string;
    profilePictureUrl: string;
    role: UserRole;
    createdAt: string;
  }

  export interface Company {
    id: number;
    name: string;
    logoUrl: string;
    logo: string;
    locationId: number;
    locationIds: number[];
    address: string;
    isParent: boolean;
    parentId: number | null;
    phoneNumber: string;
    website: string;
    purchasedAt: string;
    createdAt: string;
    updatedAt: string;
    deletedAt: string | null;
    location?: Location;
    locations?: Location[];
    departments?: Department[];
    employees?: Employee[];
    totalEmployees?: number;
    totalDepartments?: number;
    ceoId?: number;
    ceo?: CEO;
  }

  export interface CEO {
    id: number;
    firstName: string;
    lastName: string;
    tittle: string;
    location: Location;
    subordinates: Employee[];
  }

  export interface Role {
    id: number;
    name: string;
    createdAt: string;
    updatedAt: string;
  }

  export interface Employee {
    id: number;
    firstName: string;
    lastName: string;
    parentId: number | null;
    tittle: string;
    reportingManagerId: number;
    departmentId: number;
    companyId: number;
    positionId: number;
    internalEmployeeId: string;
    email: string;
    phoneNumber: string;
    salary: number;
    yearsExperience: number;
    locationId: number;
    hireDate: string;
    createdAt: string;
    updatedAt: string;
    rating: number;
    isTerminated: boolean;
    location?: Location;
    department?: Department;
    position?: Position;
    openPositions?: OpenPosition[];
    isOpenPosition?: boolean;
    skills?: Skill[];
    company?: Company;
    jobHistories?: JobHistory[];
    manager?: Employee;
    subordinates?: Employee[];
    _pagingStep: number;
    _expanded: boolean;
    _highlighted: boolean;
    _directSubordinatesPaging: number;
    _upToTheRootHighlighted: boolean;
  }

  export interface JobHistory {
    id: number;
    employeeId: number;
    positionId: number;
    departmentId: number;
    salary: number;
    startDate: string;
    endDate: string;
    changedBy: number;
    createdAt: string;
    updatedAt: string;
    position: Position;
    department: Department;
    user: User;
  }

  export interface Location {
    id: number;
    location: string;
    code: string;
    createdAt?: string;
    updatedAt?: string;
    deletedAt?: string | null;
    country?: Country;
  }

  export interface Country {
    id: number;
    country: string;
    code: string;
    createdAt: string;
    updatedAt: string;
    deletedAt: string | null;
  }

  export interface Skill {
    id: number;
    name: string;
    code: string;
    createdAt: string;
    updatedAt: string;
    deletedAt: string | null;
  }

  export interface Department {
    id: number;
    name: string;
    companyId: number;
    createdAt: string;
    updatedAt: string;
    deletedAt: string | null;
    companies?: Company[];
    company?: Company;
  }

  export interface Position {
    id: number;
    name: string;
    createdAt: string;
    updatedAt: string;
    deletedAt: string;
  }

  export interface OpenPosition {
    id: number;
    tittle: string;
    description: string;
    status: string;
    departmentId: number;
    positionId: number;
    locationId: number;
    hourlyRate: number;
    salary: number;
    createdAt: string;
    updatedAt: string;
    dateOpened: string;
    reportingToEmployeeId: number;
    seniorityLevelId: number;
    department?: Department;
    position?: Position;
    company?: Company;
  }

  export interface CharterNode {
    name: string;
    title: string;
    position: string;
    total?: number;
    children?: CharterNode[];
  }

  export interface CountryTotals {
    countryTotalMonthlyCost: number;
    countryTotalQuarterlyCost: number;
    countryTotalYearlyCost: number;
    countryTotalEmployees: number;
    countryOpenPositions: number;
    // countryPositions: {
    //   position: Position;
    //   totalMonthlyCost: number;
    //   totalQuarterlyCost: number;
    //   totalYearlyCost: number;
    //   totalEmployees: number;
    // }[];
  }

  export interface DepartmentExpense {
    departmentId: number;
    cost: number;
    departmentName: string;
    percentage: number;
  }

  export interface CompanyExpense {
    companyId: number;
    companyName: string;
    cost: number;
    revenue: number;
  }

  export interface EmployeeCompare {
    id: number;
    firstName: string;
    lastName: string;
    companyName: string;
    salary: number;
    positionName: string;
    departmentName: string;
    savings: number;
    raiseAmount: number;
    percentage: number;
    fill?: string;
  }

  export interface InsightsCompare {
    totalEmployees: number;
    totalSalary: number;
    companyCurrentExpenses: number;
    totalSavings: number;
    employees: EmployeeCompare[];
  }

  export interface FinancialsByCountry {
    countryId: string;
    countryName: string;
    countryCode: string;
    countryTotals: CountryTotals;
    groupedByLocations: {
      locationName: string;
      locationId: string;
      totalMonthlyCost: number;
      totalQuarterlyCost: number;
      totalYearlyCost: number;
      totalEmployees: number;
      openPositions: number;
      positions: {
        position: Position;
        totalMonthlyCost: number;
        totalQuarterlyCost: number;
        totalYearlyCost: number;
        totalEmployees: number;
      }[];
    }[];
  }

  export interface CSVFileData {
    id: number;
    fileName: string;
    status: string;
    userId: number;
    errors: string;
    createdAt: string;
    updatedAt: string;
  }

  export interface SaveView {
    id: number;
    type: string;
    companyId: number;
    companyName: number;
    name: string;
    company: Company;
    description: string;
    createdAt: string;
    view: any;
  }

  export enum RunAction {
    TERMINATE = 'terminate',
    OFFSHORE = 'offshore',
    UPGRADE = 'upgrade',
  }
}
