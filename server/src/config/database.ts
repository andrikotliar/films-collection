import mongoose from 'mongoose';
import { env } from './env.js';
import { FastifyInstance } from 'fastify';

const connectDatabase = async (app: FastifyInstance) => {
  try {
    await mongoose.connect(env.MONGODB_URI);

    app.log.info('MongoDB is successfully connected');
  } catch (error: any) {
    app.log.error('[Database Connection Error]:', error?.message);
    process.exit(1);
  }
};

export { connectDatabase };
