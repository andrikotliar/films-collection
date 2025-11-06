import type { FastifyInstance } from 'fastify';
import fastifyPlugin from 'fastify-plugin';
import { env, DiContainer } from '~/lib';
import { services } from '~/services';

export const diContainerDecorator = async (app: FastifyInstance) => {
  const container = new DiContainer();

  container.setInstance('databaseService', app.databaseService);
  container.setInstance('jwtService', app.jwt);

  container.registerServices(services);

  app.decorate('container', container);
};

export const DiContainerPlugin = fastifyPlugin(diContainerDecorator);
