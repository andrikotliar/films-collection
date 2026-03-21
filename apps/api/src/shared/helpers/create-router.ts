import type { ApiContract, ContractDefinition, RouteSchema } from '@films-collection/api-client';
import type { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import type z from 'zod';
import type { ResponseStatus } from '~/shared/enums';

type InferZod<S, R = undefined> = S extends z.ZodType ? z.infer<S> : R;

type InferRequest<S extends RouteSchema> = {
  Body: InferZod<S['body']>;
  Querystring: InferZod<S['querystring']>;
  Params: InferZod<S['params']>;
};

type InferResponse<S extends RouteSchema> = InferZod<S['response'], unknown>;

type HandlerContext<S extends RouteSchema> = {
  request: FastifyRequest<InferRequest<S>>;
  reply: FastifyReply;
  app: FastifyInstance;
};

type PreHandler = (request: FastifyRequest, reply: FastifyReply) => void;

type HandlerReturn<S extends RouteSchema> = {
  status?: ResponseStatus;
  data: InferResponse<S>;
};

type ApiRouteHandler<S extends RouteSchema = { response: z.ZodType }> = (
  ctx: HandlerContext<S>,
) => Promise<HandlerReturn<S>>;

export type Router = {
  prefix: string;
  routes: Array<{
    method: string;
    url: string;
    schema: RouteSchema;
    preHandler?: PreHandler[];
    handler: ApiRouteHandler;
  }>;
};

export const createRouter = <
  C extends ContractDefinition<Record<string, ApiContract<S>>>,
  S extends RouteSchema = { response: z.ZodType },
>(
  contract: C,
  routes: {
    [K in keyof C['routes']]: {
      preHandler?: PreHandler[];
      handler: ApiRouteHandler<C['routes'][K]['schema']>;
    };
  },
): Router => {
  const mappedRoutes = Object.entries(contract.routes).map(([key, value]) => {
    const routeConfig = routes[key as keyof C['routes']];

    return {
      method: value.method,
      url: value.url,
      schema: value.schema,
      preHandler: routeConfig.preHandler,
      handler: routeConfig.handler,
    };
  });

  return {
    prefix: contract.prefix,
    routes: mappedRoutes,
  };
};
