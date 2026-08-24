import type { FastifyInstance } from 'fastify';
import fastifyPlugin from 'fastify-plugin';
import { DiContainer } from '~/shared/services/di-container.js';
import type { ServiceInstances, ServiceKeys } from '~/shared/types/dependencies.js';

export const diContainerDecorator = async (app: FastifyInstance) => {
  const container = new DiContainer();

  container.setInstance('Database', app.db);
  container.setInstance('Jwt', app.jwt);

  container.registerServicesFromModules(app.apiModules);

  const servicesProxy = new Proxy({} as ServiceInstances, {
    get: (_, key: ServiceKeys) => container.resolve(key),
  });

  app.decorate('services', servicesProxy);
};

export const DiContainerPlugin = fastifyPlugin(diContainerDecorator);
