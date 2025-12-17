import type { FastifyInstance } from 'fastify';
import { ResponseCode } from '~/shared/enums';
import { unwrapSchema } from '~/shared/helpers/unwrap-schema';
import type { Route } from '~/shared/types';

export const initRouters = (routes: Route[]) => {
  return async (app: FastifyInstance) => {
    for (const route of routes) {
      app.route({
        url: route.url,
        method: route.method,
        schema: unwrapSchema(route.schema),
        preHandler: route.preHandler,
        handler: async (request: any, reply) => {
          const result = await route.handler({ request, reply, app });

          const code = result.status ? ResponseCode[result.status] : ResponseCode.OK;

          return reply.status(code).send(result.data);
        },
      });
    }
  };
};
