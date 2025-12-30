import type { FastifyInstance } from 'fastify';
import z from 'zod';
import { ResponseCode } from '~/shared/enums';
import type { Route } from '~/shared/types';

const ErrorSchema = z.object({
  code: z.string().optional(),
  message: z.string(),
  statusCode: z.number().optional(),
});

export const initRouters = (routes: Route[]) => {
  return async (app: FastifyInstance) => {
    for (const route of routes) {
      app.route({
        url: route.url,
        method: route.method,
        schema: {
          ...route.schema,
          response: {
            200: route.schema.response,
            201: route.schema.response,
            204: route.schema.response,
            400: ErrorSchema,
            401: ErrorSchema,
            404: ErrorSchema,
            500: ErrorSchema,
          },
        },
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
