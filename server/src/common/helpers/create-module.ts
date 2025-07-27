import { FastifyInstance, FastifyPluginCallback } from 'fastify';
import fastifyPlugin from 'fastify-plugin';
import { kebabToCamelCase } from './convert-kebab-case-to-camel-case';

type ModuleParams = {
  prefix: string;
  service: (app: FastifyInstance) => unknown;
  router?: FastifyPluginCallback;
};

export const createModule = ({ prefix, service, router }: ModuleParams) => {
  return fastifyPlugin(
    async (app) => {
      const serviceInstance = service(app);

      const serviceName = kebabToCamelCase(`${prefix}-service`);

      app.decorate(serviceName, serviceInstance);

      if (router) {
        app.register(router, { prefix: `/${prefix}` });
      }
    },
    { name: prefix },
  );
};
