import { z } from 'zod';
import { isValidObjectId } from 'mongoose';

export const acceptOrRejectFriendRequestSchema = z.object({
    requestId: z.string().refine((id) => isValidObjectId(id), {
    message: 'Invalid MongoDB ObjectId',
  }),
});
