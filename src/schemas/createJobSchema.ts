import { z } from 'zod';

const TEXT_REGX = /^[A-Za-z\s]+$/;

const locationSchema = z.object({
  // street1: z
  //   .string({ message: 'Street1 is required' })
  //   .min(1, 'Street1 is required'),
  // street2: z.union([z.string().optional(), z.null()]).optional(),
  // zipCode: z
  //   .number({ message: 'zip code is required' })
  //   .min(1, 'zip code is required')
  //   .refine((value) => !isNaN(Number(value)), {
  //     message: 'Zip code must be a number',
  //   }),
  // city: z.string({ message: 'City is required' }).min(1, 'City is required'),
  country: z
    .string({ message: 'Country is required' })
    .min(1, 'Country is required'),
  // state: z.string({ message: 'State is required' }).min(1, 'State is required'),
});

export const createJobSchema = z.object({
  location: locationSchema,
  // firstName: z.string().min(1, 'First name is required'),
  // lastName: z.string().min(1, 'Last name is required'),
  // middleName: z.string().optional().or(z.literal('')),
  // email: z.string().email('Invalid email address'),
  // salary: z
  //   .number({ message: 'salary must be a number' })
  //   .min(1000, 'Salary must be at least 1000$ per year'),
  tittle: z.string().min(1, 'Title is required'),
  description: z.string().min(1, 'Description is required'),
  // effectiveDate: z
  //   .string()
  //   .regex(
  //     /^\d{4}-\d{2}-\d{2}$/,
  //     'Effective date must be in mm/dd/yyyy format'
  //   ),
  // note: z.string().optional(),
  // hireDate: z
  //   .string()
  //   .regex(/^\d{4}-\d{2}-\d{2}$/, 'Hire date must be in mm/dd/yyyy format'),
  // birthday: z
  //   .string()
  //   .regex(/^\d{4}-\d{2}-\d{2}$/, 'Birth date must be in mm/dd/yyyy format'),
  // phoneNumber: z
  //   .number({ message: 'Phone number must be at least 7 digits' })
  //   .min(7, 'Phone number must be at least 7 digits'),
  // workPhone: z
  //   .number({ message: 'Work phone number must be at least 7 digits' })
  //   .min(7, 'Work phone number must be at least 7 digits'),
  departmentId: z.preprocess(
    (val) => Number(val), // Convert string to number
    z
      .number({ message: 'Department is required' })
      .min(1, 'Department is required')
  ),

  reportingToEmployeeId: z.preprocess(
    (val) => Number(val), // Convert string to number
    z.number().min(1, 'Reporting manger is required')
  ),
  // gender: z
  //   .string({ message: 'Gender is required' })
  //   .min(1, 'Gender is required'),
  // marritialStatus: z
  //   .string({ message: 'Marital status is required' })
  //   .min(1, 'Marital status is required'),
  // paymentSchedule: z
  //   .string({ message: 'Payment schedule is required' })
  //   .min(1, 'Payment schedule is required'),
  // payType: z.union([z.string().optional(), z.null()]).optional(),
  // countryId: z.union([z.number().optional(), z.null()]).optional(),
  // isManager: z.boolean().optional(),
  // profilePictureUrl: z.union([z.string().optional(), z.null()]).optional(),

  // linkedin: z
  //   .string()
  //   .url('Invalid LinkedIn URL')
  //   .optional()
  //   .nullable()
  //   .or(z.literal('')),
  // instagram: z
  //   .string()
  //   .url('Invalid Instagram URL')
  //   .optional()
  //   .nullable()
  //   .or(z.literal('')),
  // website: z
  //   .string()
  //   .url('Invalid website URL')
  //   .optional()
  //   .nullable()
  //   .or(z.literal('')),
  // facebook: z
  //   .string()
  //   .url('Invalid Facebook URL')
  //   .optional()
  //   .nullable()
  //   .or(z.literal('')),
  employmentType: z
    .string({ message: 'Employment type is required' })
    .min(1, 'Employment type is required'),
  hiringLeadId: z
    .string({ message: 'Hiring Lead is required' })
    .min(1, 'Hiring Lead is required'),
});
