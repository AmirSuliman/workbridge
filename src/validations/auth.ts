// validation/authSchema.ts
import * as z from 'zod';
import { email, password } from './common';

export const authSchema = z.object({
  email: email,
  password: password,
});

export const emailSchema = z.object({
  email: email,
});

export const resetPasswordSchema = z
  .object({
    password: password,
    confirmPassword: password,
  })
  .superRefine((data, ctx) => {
    if (data.password !== data.confirmPassword) {
      ctx.addIssue({
        code: 'custom', // Specify that this is a custom validation issue
        path: ['confirmPassword'],
        message: 'Passwords do not match',
      });
    }
  });
