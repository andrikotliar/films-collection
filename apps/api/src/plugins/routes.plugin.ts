import type { FastifyInstance } from 'fastify';
import { createRouter } from '~/common';
import { routes } from '~/routes';

export const RoutesPlugin = async (app: FastifyInstance) => {
  for (const config of routes) {
    app.register(createRouter(config.routes), { prefix: `/${config.prefix}` });
    app.log.info(`[Registered Route]: /api/${config.prefix}`);
  }
};
