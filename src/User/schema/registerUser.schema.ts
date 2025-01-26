import { z } from 'zod';

export const registerUserSchema = z.object({
  username: z.string().min(3),
  email: z.string().email(),
  password: z.string().min(6),
  interests: z.array(z.string()).optional(),
});
