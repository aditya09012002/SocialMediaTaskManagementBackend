/* eslint-disable @typescript-eslint/no-unused-vars */
import * as express from 'express';
interface DecodedUser {
  id: string;
  username: string;
  email: string;
}

declare global {
  namespace Express {
    interface Request {
      user?: User;
      files?: Express.Multer.File[];
    }
  }
}
