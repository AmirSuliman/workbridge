import { z } from 'zod';

const TEXT_REGX = /^[A-Za-z\s]+$/;

const locationSchema = z.object({
  street1: z
    .string({ message: 'Street1 is required' })
    // .min(1, 'Street1 is required'),
    .optional(),

  street2: z.union([z.string().optional(), z.null()]).optional(),
  zipCode: z
    .string()
    .trim()
    .transform((val) => (val === '' ? undefined : Number(val)))
    .refine((val) => val === undefined || !isNaN(val), {
      message: 'Must be a valid number',
    })
    .optional(),
  city: z.string({ message: 'City is required' }).optional(),
  country: z
    .string({ message: 'Country is required' })
    .min(1, 'Country is required'),
  state: z.string({ message: 'State is required' }).optional(),
});

export const employeeSchema = z.object({
  location: locationSchema,
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  middleName: z.string().optional().or(z.literal('')),
  email: z.string().email('Invalid email address'),
  salary: z
    .number({ message: 'salary must be a number' })
    .min(1000, 'Salary must be at least 1000$ per year'),
  tittle: z.string().min(1, 'Title is required'),
  hireDate: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, 'Hire date must be in mm/dd/yyyy format')
    .optional()
    .or(z.literal(''))
    .transform((val) => (val === '' ? undefined : val)),

  birthday: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, 'Birth date must be in mm/dd/yyyy format')
    .optional()
    .or(z.literal(''))
    .transform((val) => (val === '' ? undefined : val)),
  phoneNumber: z
    .string()
    .trim()
    .transform((val) => (val === '' ? undefined : Number(val)))
    .refine((val) => val === undefined || !isNaN(val), {
      message: 'Must be a valid number',
    })
    .refine((val) => val === undefined || val.toString().length >= 7, {
      message: 'Phone number must be at least 7 digits',
    })
    .optional(),

  workPhone: z
    .string()
    .trim()
    .transform((val) => (val === '' ? undefined : Number(val)))
    .refine((val) => val === undefined || !isNaN(val), {
      message: 'Must be a valid number',
    })
    .refine((val) => val === undefined || val.toString().length >= 7, {
      message: 'Work phone must be at least 7 digits',
    })
    .optional(),
  departmentId: z.preprocess(
    (val) => Number(val), // Convert string to number
    z
      .number({ message: 'Department is required' })
      .min(1, 'Department is required')
  ),

  reportingManagerId: z.preprocess(
    (val) => Number(val), // Convert string to number
    z.number().min(1, 'Reporting manger is required')
  ),
  gender: z
    .string({ message: 'Gender is required' })
    .min(1, 'Gender is required'),
  marritialStatus: z
    .string({ message: 'Marital status is required' })
    .min(1, 'Marital status is required'),
  paymentSchedule: z
    .string({ message: 'Payment schedule is required' })
    .min(1, 'Payment schedule is required'),
  payType: z
    .string({ message: 'Paytype is required' })
    .min(1, 'Paytype is required'),
  countryId: z.preprocess(
    (val) => Number(val), // Convert string to number
    z.number({ message: 'Country is required' }).min(1, 'Country is required')
  ),
  isManager: z.boolean().optional(),
  profilePictureUrl: z.union([z.string().optional(), z.null()]).optional(),

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
  employmentType: z
    .string({ message: 'Employment type is required' })
    .min(1, 'Employment type is required'),
});

// --------------------------------------------------------------------------------------------
export const putEmployeeSchema = z.object({
  location: locationSchema,
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  email: z.string().email('Invalid email address'),
  middleName: z.string().optional().nullable().or(z.literal('')),
  tittle: z.string().min(1, 'Title is required'),

  note: z.string().optional(),
  hireDate: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, 'Hire date must be in mm/dd/yyyy format')
    .optional()
    .or(z.literal(''))
    .transform((val) => (val === '' ? undefined : val)),

  birthday: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, 'Birth date must be in mm/dd/yyyy format')
    .optional()
    .or(z.literal(''))
    .transform((val) => (val === '' ? undefined : val)),
  phoneNumber: z
    .string()
    .trim()
    .transform((val) => (val === '' ? undefined : Number(val)))
    .refine((val) => val === undefined || !isNaN(val), {
      message: 'Must be a valid number',
    })
    .refine((val) => val === undefined || val.toString().length >= 7, {
      message: 'Phone number must be at least 7 digits',
    })
    .optional(),

  workPhone: z
    .string()
    .trim()
    .transform((val) => (val === '' ? undefined : Number(val)))
    .refine((val) => val === undefined || !isNaN(val), {
      message: 'Must be a valid number',
    })
    .refine((val) => val === undefined || val.toString().length >= 7, {
      message: 'Work phone must be at least 7 digits',
    })
    .optional(),

  departmentId: z.preprocess(
    (val) => Number(val), // Convert string to number
    z
      .number({ message: 'Department is required' })
      .min(1, 'Department is required')
    // .optional()
  ),

  reportingManagerId: z.preprocess(
    (val) => Number(val), // Convert string to number
    z.number().optional()
  ),
  gender: z
    .string({ message: 'Gender is required' })
    // .min(1, 'Gender is required'),
    .optional()
    .nullable()
    .or(z.literal('')),

  marritialStatus: z
    .string({ message: 'Marital status is required' })
    // .min(1, 'Marital status is required'),
    .optional()
    .nullable()
    .or(z.literal('')),

  countryId: z.union([z.number().optional(), z.null()]).optional(),
  isManager: z.boolean().optional(),
  profilePictureUrl: z.union([z.string().optional(), z.null()]).optional(),
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
  employmentType: z
    .string({ message: 'Employment type is required' })
    // .min(1, 'Employment type is required'),
    .optional(),
});

// --------------------------------------------------------------------------------------------
export const emergencyContactSchema = z.object({
  firstName: z
    .string()
    .min(1, 'First name is required')
    .regex(TEXT_REGX, 'special characters or numbers not allowed'),
  lastName: z
    .string()
    .min(1, 'Last name is required')
    .regex(TEXT_REGX, 'special characters or numbers not allowed'),
  middleName: z
    .string()
    .regex(TEXT_REGX, 'special characters or numbers not allowed')
    .optional()
    .or(z.literal('')),
  phone: z
    .number({ message: 'Phone number must be at least 7 digits' })
    .min(7, 'Phone number must be at least 7 digits'),
  workPhone: z
    .number({ message: 'Work phone number must be at least 7 digits' })
    .nullable()
    .optional(),
  email: z.string().email('Invalid email address'),
  location: z.object({
    street1: z.union([z.string().optional(), z.null()]).optional(),
    street2: z.union([z.string().optional(), z.null()]).optional(),
    zipCode: z
      .union([
        z.number({ message: 'Zip code must be a number' }).optional(),
        z.string().length(0), // Allow empty string
      ])
      .nullable()
      .optional()
      .transform((value) => (value === '' ? null : value)),
    city: z.string({ message: 'City is required' }).optional(),
    country: z
      .string({ message: 'Country is required' })
      .min(1, 'Country is required')
      .regex(TEXT_REGX, 'special characters or numbers not allowed'),
    state: z.string({ message: 'State is required' }).optional(),
  }),
});
