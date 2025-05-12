import { FastifyInstance, FastifyPluginCallback } from 'fastify';
import fastifyPlugin from 'fastify-plugin';
import { kebabToCamelCase } from './convert-kebab-case-to-camel-case';

type ModuleParams = {
  prefix: string;
  service: (app: FastifyInstance) => unknown;
  controller?: FastifyPluginCallback;
};

export const createModule = ({ prefix, service, controller }: ModuleParams) => {
  return fastifyPlugin(
    async (app) => {
      const serviceInstance = service(app);

      const serviceName = kebabToCamelCase(`${prefix}-service`);

      app.decorate(serviceName, serviceInstance);

      if (controller) {
        app.register(controller, { prefix: `/${prefix}` });
      }
    },
    { name: prefix },
  );
};
