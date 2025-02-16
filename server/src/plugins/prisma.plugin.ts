import { FastifyInstance } from 'fastify';
import { PrismaClient } from '@prisma/client';
import fastifyPlugin from 'fastify-plugin';

declare module 'fastify' {
  export interface FastifyInstance {
    database: PrismaClient;
  }
}

const prisma = new PrismaClient({
  log: ['info'],
  errorFormat: 'minimal',
});

const prismaDecorator = async (app: FastifyInstance) => {
  app.decorate('database', prisma);

  app.addHook('onClose', async (instance) => {
    await instance.database.$disconnect();
  });
};

export const PrismaPlugin = fastifyPlugin(prismaDecorator);
