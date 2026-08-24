import type { FastifyInstance } from 'fastify';
import { initRouters } from '~/shared/helpers/init-routers.js';

export const RoutesPlugin = async (app: FastifyInstance) => {
  for (const module of app.apiModules) {
    const router = module.router;

    if (!router) {
      continue;
    }

    app.register(initRouters(router.routes), { prefix: `/${router.prefix}` });
    app.log.info(`[Registered Route]: /api/${router.prefix}`);
  }
};
