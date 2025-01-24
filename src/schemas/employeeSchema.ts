import { z } from 'zod';
const locationSchema = z.object({
  street1: z
    .string({ message: 'Street1 is required' })
    .min(1, 'Street1 is required'),
  zipCode: z
    .number({ message: 'zip code is required' })
    .min(1, 'zip code is required')
    .refine((value) => !isNaN(Number(value)), {
      message: 'Zip code must be a number',
    }),
  city: z.string({ message: 'City is required' }).min(1, 'City is required'),
  country: z
    .string({ message: 'Country is required' })
    .min(1, 'Country is required'),
  state: z.string({ message: 'State is required' }).min(1, 'State is required'),
});

export const employeeSchema = z.object({
  location: locationSchema,
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  email: z.string().email('Invalid email address'),
  middleName: z.string().optional(),
  salary: z
    .number({ message: 'salary must be a number and at least 1 digit' })
    .min(1, 'Salary must be a positive number'),
  tittle: z.string().min(1, 'Title is required'),
  effectiveDate: z
    .string()
    .regex(
      /^\d{4}-\d{2}-\d{2}$/,
      'Effective date must be in DD/MM/YYYY format'
    ),
  note: z.string().optional(),
  hireDate: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, 'Hire date must be in DD/MM/YYYY format'),
  birthday: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, 'Birth date must be in DD/MM/YYYY format'),
  phoneNumber: z
    .number({ message: 'Phone number must be at least 7 digits' })
    .min(7, 'Phone number must be at least 7 digits'),
  workPhone: z
    .number({ message: 'Work phone number must be at least 7 digits' })
    .min(7, 'Work phone number must be at least 7 digits'),
  departmentId: z.string().min(1, 'Department id is required'),
  gender: z.string().min(1, 'Gender is required'),
  marritialStatus: z.string().min(1, 'Marital status is required'),
  paymentSchedule: z.string().min(1, 'Payment schedule is required'),
  payType: z.string().min(1, 'Pay type is required'),
  profilePictureUrl: z
    .union([
      // z.instanceof(File), // Validate as a File
      z.string().optional(), // Allow pre-existing URLs
      z.null(), // Allow no value
    ])
    .optional(), // Make the entire field optional

  linkedin: z
    .string()
    .url('Invalid LinkedIn URL')
    .optional()
    .nullable()
    .or(z.literal('')),
  instagram: z
    .string()
    .url('Invalid Instagram URL')
    .optional()
    .nullable()
    .or(z.literal('')),
  website: z
    .string()
    .url('Invalid website URL')
    .optional()
    .nullable()
    .or(z.literal('')),
  facebook: z
    .string()
    .url('Invalid Facebook URL')
    .optional()
    .nullable()
    .or(z.literal('')),

  reportingManagerId: z.string().min(1, 'Reporting manger is required'),
  employmentType: z.string().min(1, 'Employment type is required'),
});
