import type { FastifyInstance } from 'fastify';
import fastifyPlugin from 'fastify-plugin';
import { services } from '~/modules/app.module.js';
import { DiContainer } from '~/shared/services/di-container.js';

export const diContainerDecorator = async (app: FastifyInstance) => {
  const container = new DiContainer({ ...services, db: app.db, jwt: app.jwt });

  app.decorate('resolve', container.resolve.bind(container));
};

export const DiContainerPlugin = fastifyPlugin(diContainerDecorator);
