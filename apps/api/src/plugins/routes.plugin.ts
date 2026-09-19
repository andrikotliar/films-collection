import type { FastifyInstance } from 'fastify';
import { routers } from '~/modules/app.module.js';
import { initRouters } from '~/shared/helpers/init-routers.js';

export const RoutesPlugin = async (app: FastifyInstance) => {
  for (const routes of routers) {
    app.register(initRouters(routes));
  }
};
