import { FastifyInstance } from 'fastify';
import { modules } from './modules';

export const AppModule = async (app: FastifyInstance) => {
  for (const module of modules) {
    app.register(module);
  }
};
