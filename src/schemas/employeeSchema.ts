import { z } from 'zod';

export const employeeSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  departmentId: z
    .number()
    .int()
    .positive('Department ID must be a positive integer'),
  email: z.string().email('Invalid email address'),
  middleName: z.string().optional(),
  salary: z.number().min(0, 'Salary must be a positive number'),
  tittle: z.string().min(1, 'Title is required'),
  // gender: z.enum(['Male', 'Female', 'Other']),
  // marritialStatus: z.enum(['Single', 'Married', 'Divorced', 'Widowed']),
  // paymentSchedule: z.enum(['Once a month', 'Bi-weekly', 'Weekly']),
  // payType: z.enum(['Salary', 'Hourly']).refine((val) => ['Salary', 'Hourly'].includes(val), {
  //   message: 'Invalid pay type',
  // }),
  effectiveDate: z
    .string()
    .regex(
      /^\d{4}-\d{2}-\d{2}$/,
      'Effective date must be in YYYY-MM-DD format'
    ),
  overtime: z.boolean(),
  note: z.string().optional(),
  // profilePictureUrl: z.string().url('Invalid URL').nullable(),
  // linkedin: z
  //   .string()
  //   .url('Invalid LinkedIn URL')
  //   .optional()
  //   .transform((val) => (val === '' ? null : val)),
  // instagram: z
  //   .string()
  //   .url('Invalid Instagram URL')
  //   .optional()
  //   .transform((val) => (val === '' ? null : val)),
  // website: z
  //   .string()
  //   .url('Invalid website URL')
  //   .optional()
  //   .transform((val) => (val === '' ? null : val)),
  // facebook: z
  //   .string()
  //   .url('Invalid Facebook URL')
  //   .optional()
  //   .transform((val) => (val === '' ? null : val)),

  hireDate: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, 'Hire date must be in YYYY-MM-DD format'),
  birthday: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, 'Birth date must be in YYYY-MM-DD format'),
  phoneNumber: z.string().min(7, 'Phone number must be at least 7 characters'),
  workPhone: z
    .string()
    .min(7, 'Work phone number must be at least 7 characters'),
  reportingManagerId: z
    .number()
    .int()
    .positive('Reporting Manager ID must be a positive integer'),
  // employmentType: z
  //   .enum(['Fulltime', 'Parttime', 'Contractor', 'Intern'])
  //   .refine(
  //     (val) => ['Fulltime', 'Parttime', 'Contractor', 'Intern'].includes(val),
  //     {
  //       message: 'Invalid employment type',
  //     }
  //   ),
  // location: z.object({
  street1: z.string().min(1, 'Street1 is required'),
  // street2: z.string().optional().nullable(),
  zipCode: z.number().int().positive('Zip code must be a positive integer'),
  city: z.string().min(1, 'City is required'),
  country: z.string().min(1, 'Country is required'),
  state: z.string().min(1, 'State is required'),
  // }),
});
