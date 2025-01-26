import { isValidObjectId } from 'mongoose';
import { z } from 'zod';

export const sendRequestSchema = z.object({
  receiverId: z.string().refine((id) => isValidObjectId(id), {
    message: 'Invalid MongoDB ObjectId',
  }),
});
