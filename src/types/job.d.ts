import { Location } from './employee';

// Define types for a job form
export interface JobFormFields {
  tittle: string;
  departmentId: string;
  employmentType: string;
  hiringLeadId: string;
  reportingToEmployeeId: string;
  minYearsExperience: string;
  description: string;
  dateOpened: string;
  dateEnd: string;
  location: {
    id: number;
    street1: string;
    street2?: string;
    zipCode: string;
    city: string;
    country: string;
    state: string;
  };
  salary: string;
  Resume: string | boolean;
  Address: string | boolean;
  linkedin: string | boolean;
  companyWebsite: string | boolean;
  glassdoor: string | boolean;
  indeed: string | boolean;
}

// Define job status
export type JobStatus = 'Published' | 'Draft';

// Define types for job listing
export interface JobListing {
  message: string;
  data: {
    id: number;
    tittle: string;
    description: string;
    employmentType: string;
    department: {
      id: number;
      name: string;
    };
    departmentId: number;
    salary: number;
    minYearsExperience: number;
    status: string;
    dateOpened: string;
    dateEnd: string;
    createdAt: string;
    location: {
      id: number;
      street1: string;
      street2?: string;
      zipCode: string;
      city: string;
      country: string;
      state: string;
    };
    locationId: number;
    hiringLead: {
      id: number;
      firstName: string;
      middleName?: string;
      lastName: string;
      tittle: string;
      profilePictureUrl: string | null;
    };
    hiringLeadId: number;
    reportingToEmployee: {
      id: number;
      firstName: string;
      middleName?: string;
      lastName: string;
      tittle: string;
    };
    reportingToEmployeeId: number;
    applicationRequirements: Array<{
      id: number;
      name: string;
      required: boolean;
    }>;
    sharedJobs: Array<{
      id: number;
      platform: string;
    }>;
    customQuestions: Array<{
      id: number;
      question: string;
      required: boolean;
    }>;
  };
}

// type JobFormFields = {
//   tittle: string;
//   departmentId: string;
//   employmentType: string;
//   hiringLeadId: string;
//   reportingToEmployeeId: string;
//   minYearsExperience: string;
//   description: string;
//   dateOpened: string;
//   dateEnd: string;
//   location: {
//     id: number;
//     street1: string;
//     street2?: string;
//     zipCode: string;
//     city: string;
//     country: string;
//     state: string;
//   };
//   salary: string;
//   Resume: string | boolean;
//   Address: string | boolean;
//   linkedin: string | boolean;
//   companyWebsite: string | boolean;
//   glassdoor: string | boolean;
//   indeed: string | boolean;
// };

interface JobPreviewData {
  tittle: string;
  description: string;
  department: string;
  salary: number;
  employmentType: string;
  hiringLead: string;
  reportingTo: string;
  minYearsExperience: number;
  requirements: { name: string; required: boolean }[];
  location: {
    // id: number;
    street1: string;
    street2?: string;
    zipCode: string;
    city: string;
    country: string;
    state: string;
  };
  shareWebsites: string[];
  questions: { question: string; required: boolean }[];
}
