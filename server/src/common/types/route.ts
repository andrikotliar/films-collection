import { Static, TSchema } from '@sinclair/typebox';
import {
  FastifyReply,
  FastifyRequest,
  FastifySchema,
  HTTPMethods,
} from 'fastify';
import { preHandlerMetaHookHandler } from 'fastify/types/hooks';
import { ResponseStatus } from '../enums';

export type RouteSchema = {
  [key in keyof FastifySchema]?: TSchema;
};

export type HandlerReturnValue = {
  status: ResponseStatus;
  data?: unknown;
};

type InferRequestType<S extends Partial<RouteSchema>> = {
  Body: S['body'] extends TSchema ? Static<S['body']> : undefined;
  Querystring: S['querystring'] extends TSchema
    ? Static<S['querystring']>
    : undefined;
  Params: S['params'] extends TSchema ? Static<S['params']> : undefined;
  Headers: S['headers'] extends TSchema ? Static<S['headers']> : undefined;
};

type HandlerContext<S extends Partial<RouteSchema>> = {
  request: FastifyRequest<InferRequestType<S>>;
  reply: FastifyReply;
};

export type Route<S extends RouteSchema> = {
  method: HTTPMethods;
  url: string;
  schema?: S;
  preHandler?: preHandlerMetaHookHandler[];
  handler: (ctx: HandlerContext<S>) => Promise<HandlerReturnValue>;
};
