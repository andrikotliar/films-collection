import type { FastifyReply, FastifyRequest, FastifyInstance } from 'fastify';
import type z from 'zod';
import type { ResponseStatus } from '~/shared/enums';

export type RouteSchema = {
  body?: z.ZodType;
  querystring?: z.ZodType;
  params?: z.ZodType;
  response: z.ZodType;
};

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

export type Route<S extends RouteSchema = { response: z.ZodType }> = {
  method: 'GET' | 'POST' | 'PATCH' | 'PUT' | 'DELETE';
  url: string;
  schema: S;
  preHandler?: PreHandler[];
  handler: (ctx: HandlerContext<S>) => Promise<HandlerReturn<S>>;
};
