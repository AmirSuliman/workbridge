import { z } from 'zod';
import { email, password } from './common';

export const hrFormSchema = z.object({
  email: email,
  password: password,
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  roleId: z.coerce
    .number()
    .int('Role is required')
    .positive('Role is required'),
  countryId: z.coerce
    .number({ message: 'Coutnry is required.' })
    .int('Country ID must be an integer')
    .positive('Country is required')
    .nullable(),
  reportingManagerId: z.preprocess(
    (val) => Number(val), // Convert string to number
    z
      .number({ message: 'Reporting manager is required' })
      .min(1, 'Reporting manager is required')
  ),
  isManager: z.boolean().optional(),
});
