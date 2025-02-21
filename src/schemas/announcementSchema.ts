import { z } from 'zod';

export const announcementSchema = z.object({
  title: z.string().nonempty('Title is required'),
  body: z.string().nonempty('Content is required'),
});
