// Define the Policy type
export interface Policy {
  id: number | null;
  type: string;
  title: string;
  fileId: number | null;
  status: string;
  uploadBy: number | null;
  description: string;
  previewUrl: string | null; // this is only for the front end manipulation. backend does not have it.
  effectiveDate: string;
  totalEmployees: number;
  employeeAccepted: number;
  users?: {
    firstName: string;
    lastName: string;
  };
  updatedAt?: string | undefined;
}
