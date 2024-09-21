import mongoose from 'mongoose';
import { FastifyInstance } from 'fastify';
import { env } from './env.js';

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
