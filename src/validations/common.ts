import { X } from 'lucide-react';
import { z } from 'zod';

export const password = z
  .string()
  .min(8, { message: 'Password must be at least 8 characters' })
  .refine((val) => !val || val.length >= 8, {
    message: 'Password must be at least 8 characters',
  })
  .refine((val) => !val || /[A-Z]/.test(val), {
    message: 'Password must contain at least one uppercase letter',
  })
  .refine((val) => !val || /[a-z]/.test(val), {
    message: 'Password must contain at least one lowercase letter',
  })
  .refine((val) => !val || /\d/.test(val), {
    message: 'Password must contain at least one number',
  })
  .refine((val) => !val || /[@$!%*?&#|]/.test(val), {
    message:
      'Password must contain at least one special character - (@$!%*?&#|)',
  });

export const email = z
  .string()
  .trim()
  .email({ message: 'Invalid Email Format' });

export const updatePassword = z.object({
  oldPassword: password,
  newPassword: password,
});
