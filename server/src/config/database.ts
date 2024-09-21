import mongoose from 'mongoose';
import { env } from './env.js';

const connectDatabase = async () => {
  try {
    await mongoose.connect(env.MONGODB_URI);

    console.log('MongoDB is successfully connected');
  } catch (error: any) {
    console.error('[Database Connection Error]:', error?.message);
    process.exit(1);
  }
};

export { connectDatabase };
