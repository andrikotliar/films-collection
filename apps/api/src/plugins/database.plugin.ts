import type { FastifyInstance } from 'fastify';
import { PrismaClient } from '@prisma/client';
import fastifyPlugin from 'fastify-plugin';

const prisma = new PrismaClient({
  log: ['info'],
});

const databaseDecorator = async (app: FastifyInstance) => {
  app.decorate('databaseService', prisma);

  app.addHook('onClose', async (instance) => {
    await instance.databaseService.$disconnect();
  });
};

export const DatabasePlugin = fastifyPlugin(databaseDecorator);
