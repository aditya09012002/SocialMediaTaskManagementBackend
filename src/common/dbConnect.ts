import mongoose from 'mongoose';
import { config } from 'dotenv';

config();

export const dbConnect = async (): Promise<void> => {
  try {
    const dbUri = process.env.MONGODB_URI;
    if (!dbUri) {
      throw new Error(
        'MONGODB_URI is not defined in the environment variables.',
      );
    }
    await mongoose.connect(dbUri);
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1);
  }
};
