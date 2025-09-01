import { FastifyInstance } from 'fastify';
import { ResponseCode } from 'src/common/enums';
import type { Route } from 'src/common/types';

export const createRouter = (routes: Route[]) => {
  return async (app: FastifyInstance) => {
    for (const route of routes) {
      app.route({
        url: route.url,
        method: route.method,
        schema: route.schema,
        preHandler: route.isPrivate ? [app.authenticate] : undefined,
        handler: async (request: any, reply) => {
          const data = await route.handler({ request, reply });

          const code = route.successStatus ? ResponseCode[route.successStatus] : ResponseCode.OK;

          return reply.status(code).send(data);
        },
      });
    }
  };
};
