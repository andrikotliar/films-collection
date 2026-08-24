import type { FastifyInstance } from 'fastify';
import fastifyPlugin from 'fastify-plugin';
import { services, type ApiServices } from '~/modules/app.module.js';
import { DiContainer } from '~/shared/services/di-container.js';

export const diContainerDecorator = async (app: FastifyInstance) => {
  const container = new DiContainer({ ...services, Database: app.db, Jwt: app.jwt });

  const servicesProxy = new Proxy(
    {} as { [K in keyof ApiServices]: InstanceType<ApiServices[K]> },
    {
      get: (_, key: keyof ApiServices) => container.resolve(key),
    },
  );

  app.decorate('services', servicesProxy);
};

export const DiContainerPlugin = fastifyPlugin(diContainerDecorator);
