import type { FastifyInstance } from 'fastify';
import { initRouters } from '~/shared/index.js';
import { routers } from '~/modules/index.js';

export const RoutesPlugin = async (app: FastifyInstance) => {
  for (const router of routers) {
    app.register(initRouters(router.routes), { prefix: `/${router.prefix}` });
    app.log.info(`[Registered Route]: /api/${router.prefix}`);
  }
};
