export interface Location {
  id?: number;
  city: string;
  country: string;
  state: string;
  street1: string;
  street2: string | null;
  zipCode: number;
}

export interface Department {
  id: number;
  name: string;
}

export interface EmployeeData {
  id: number;
  userId: number;
  firstName: string;
  middleName: string | null;
  lastName: string;
  tittle: string;
  birthday: string | null;
  gender: string;
  email: string;
  phoneNumber: string | null;
  workPhone: string | null;
  salary: number;
  paymentSchedule: string;
  payType?: string;
  hireDate: string;
  marritialStatus: string;
  linkedin: string | null;
  employmentType: string | null;
  facebook: string | null;
  instagram: string | null;
  website: string | null;
  profilePictureUrl: string;
  location: Location;
  locationId: number;
  department: Department;
  departmentId: number;
  effectiveDate: string | null;
  reportingManagerId: number | null;
}

type question = {
  title: string;
  id: number;
  required: boolean;
};

export interface AllEmployeeData {
  totalItems: number;
  items: EmployeeData[];
  totalPages: number;
  currentPage: number;
}
