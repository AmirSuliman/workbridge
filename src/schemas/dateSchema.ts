import { z } from 'zod';

// Reusable date schema
export const dateSchema = z
  .string()
  .regex(/^\d{4}-\d{2}-\d{2}$/, 'Date must be in YYYY-MM-DD format');

// Example usage in a form schema
export const dateFieldSchema = z.object({
  hireDate: dateSchema,
  effectiveDate: dateSchema,
  birthday: dateSchema,
});
