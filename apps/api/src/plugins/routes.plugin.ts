import type { FastifyInstance } from 'fastify';
import { initRouters } from '~/shared';
import { routers } from '~/routes';
import { convertCamelCaseToKebabCase } from '@films-collection/shared';

export const RoutesPlugin = async (app: FastifyInstance) => {
  for (const [key, routes] of Object.entries(routers)) {
    const prefix = convertCamelCaseToKebabCase(key);
    app.register(initRouters(routes), { prefix: `/${prefix}` });
    app.log.info(`[Registered Route]: /api/${prefix}`);
  }
};
