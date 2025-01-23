// Define the Policy type
export interface Policy {
  id: number;
  type: string;
  title: string;
  fileId: number | null;
  status: string;
  uploadBy: number;
  description: string;
  effectiveDate: string;
  totalEmployees: number;
  employeeAccepted: number;
}
