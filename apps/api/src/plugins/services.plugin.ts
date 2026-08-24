import type { FastifyInstance } from 'fastify';
import fastifyPlugin from 'fastify-plugin';
import { DiContainer } from '~/shared/services/di-container.js';

export const diContainerDecorator = async (app: FastifyInstance) => {
  const container = new DiContainer();

  container.setInstance('Database', app.db);
  container.setInstance('Jwt', app.jwt);

  container.registerServicesFromModules(app.apiModules);

  app.decorate('service', container.resolve);
};

export const DiContainerPlugin = fastifyPlugin(diContainerDecorator);
