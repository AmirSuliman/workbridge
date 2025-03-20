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

// Job Creation Schema
export const createJobSchema = z.object({
  location: locationSchema,
  tittle: z.string().min(1, 'Job title is required'),
  description: z
    .string()
    .min(10, 'Job description must be at least 10 characters'),
  status: z.enum(['Draft', 'Published']).optional().default('Draft'),
  departmentId: z
    .union([
      z.string().min(1, 'Department is required'),
      z.number().positive('Department ID must be a positive number'),
    ])
    .transform((val) => (typeof val === 'string' ? parseInt(val) : val)),
  salary: z
    .string()
    .trim()
    .transform((val) => (val === '' ? undefined : Number(val)))
    .refine((val) => val === undefined || !isNaN(val), {
      message: 'Must be a valid number',
    })
    .optional(),
  employmentType: z.enum(
    [
      'Fulltime',
      'Parttime',
      'Contract',
      'Temporary',
      'Internship',
      'Freelance',
    ],
    {
      errorMap: () => ({ message: 'Please select a valid employment type' }),
    }
  ),
  hiringLeadId: z.preprocess(
    (val) => Number(val),
    z.number().min(1, 'Hiring lead is required')
  ),
  reportingToEmployeeId: z.preprocess(
    (val) => Number(val),
    z.number().min(1, 'Reporting manger is required')
  ),
  minYearsExperience: z
    .string()
    .trim()
    .transform((val) => (val === '' ? undefined : Number(val)))
    .refine((val) => val === undefined || !isNaN(val), {
      message: 'Must be a valid number',
    })
    .optional(),
  dateOpened: z.string().refine(
    (val) => {
      const date = new Date(val);
      return !isNaN(date.getTime());
    },
    { message: 'Invalid opening date' }
  ),

  dateEnd: z
    .string()
    .refine(
      (val) => {
        if (!val) return true; // Allow empty string
        const date = new Date(val);
        return !isNaN(date.getTime());
      },
      { message: 'Invalid end date' }
    )
    .optional(),

  // The following fields will be processed separately but included for form validation
  // Requirement checkboxes
  // Resume: z.string().optional(),
  // Address: z.string().optional(),
  // CoverLetter: z.string().optional(),
  // Portfolio: z.string().optional(),
  // DesiredSalary: z.string().optional(),
  // Education: z.string().optional(),
  // LinkedinProfile: z.string().optional(),
  // Referral: z.string().optional(),
  // Website: z.string().optional(),

  // Share websites checkboxes
  // linkedin: z.boolean().optional(),
  // glassdoor: z.string().optional(),
  // indeed: z.boolean().optional(),
  // companyWebsite: z.string().optional(),
  // facebook: z.boolean().optional(),
});
