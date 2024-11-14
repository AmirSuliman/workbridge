// validation/authSchema.ts
import * as z from 'zod';
let password = z
    .string().min(8, { message: 'Password must be at least 8 characters' })
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
    .refine((val) => !val || /[@$!%*?&#]/.test(val), {
        message: 'Password must contain at least one special character',
    });

export const authSchema = z.object({
    email: z
        .string().email({ message: 'Invalid Email Format' }),
    password: password
});

export const emailSchema = z.object({
    email: z
        .string().email({ message: 'Invalid Email Format' }),
});

export const resetPasswordSchema = z.object({
    password: password,
    confirmPassword: password,
}).superRefine((data, ctx) => {
    if (data.password !== data.confirmPassword) {
        ctx.addIssue({
            code: 'custom', // Specify that this is a custom validation issue
            path: ['confirmPassword'],
            message: 'Passwords do not match',
        });
    }
});
