import { FastifyInstance } from 'fastify';
import { ResponseCode } from 'src/common/enums';
import { Route, RouteSchema } from 'src/common/types';

type Router = (app: FastifyInstance, defineRoute: typeof defineRouteFn) => Route<any>[];

const defineRouteFn = <S extends Partial<RouteSchema>>(route: Route<S>) => {
  return route;
};

export const createRouter = (router: Router) => {
  return async (app: FastifyInstance) => {
    const routes = router(app, defineRouteFn);

    for (const route of routes) {
      app.route({
        url: route.url,
        method: route.method,
        schema: route.schema,
        preHandler: route.preHandler,
        handler: async (request: any, reply) => {
          const response = await route.handler({ request, reply });

          return reply.status(ResponseCode[response.status]).send(response.data);
        },
      });
    }
  };
};
