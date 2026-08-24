import type { FastifyInstance } from 'fastify';
import { routes } from '~/modules/app.module.js';
import { initRouters } from '~/shared/helpers/init-routers.js';

export const RoutesPlugin = async (app: FastifyInstance) => {
  for (const router of routes) {
    app.register(initRouters(router.routes), { prefix: `/${router.prefix}` });
    app.log.info(`[Registered Route]: /api/${router.prefix}`);
  }
};
