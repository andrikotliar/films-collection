import type { Static, TSchema } from '@sinclair/typebox';
import type { FastifyReply, FastifyRequest, FastifyInstance } from 'fastify';
import type { ResponseStatus } from '~/shared/enums';

export type RouteSchema = {
  body?: TSchema;
  querystring?: TSchema;
  params?: TSchema;
  response?: TSchema;
};

type InferRequest<S extends Partial<RouteSchema>> = {
  Body: S['body'] extends TSchema ? Static<S['body']> : undefined;
  Querystring: S['querystring'] extends TSchema ? Static<S['querystring']> : undefined;
  Params: S['params'] extends TSchema ? Static<S['params']> : undefined;
};

type InferResponse<S extends Partial<RouteSchema>> = S['response'] extends TSchema
  ? Static<S['response']>
  : unknown;

type HandlerContext<S extends Partial<RouteSchema>> = {
  request: FastifyRequest<InferRequest<S>>;
  reply: FastifyReply;
  app: FastifyInstance;
};

type PreHandler = (request: FastifyRequest, reply: FastifyReply) => void;

type HandlerReturn<S extends Partial<RouteSchema>> = {
  status?: ResponseStatus;
  data: InferResponse<S>;
};

export type Route<S extends RouteSchema = {}> = {
  method: 'GET' | 'POST' | 'PATCH' | 'PUT' | 'DELETE';
  url: string;
  schema?: S;
  preHandler?: PreHandler[];
  handler: (ctx: HandlerContext<S>) => Promise<HandlerReturn<S>>;
};
