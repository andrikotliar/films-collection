import type { z } from 'zod';

export type RouteSchema = {
  body?: z.ZodType;
  querystring?: z.ZodType;
  params?: z.ZodType;
  response: z.ZodType;
};

export type ApiContract<S extends RouteSchema = { response: z.ZodType }> = {
  method: 'GET' | 'POST' | 'PATCH' | 'PUT' | 'DELETE';
  url: string;
  schema: S;
};

export type ContractDefinition<
  TRoutes extends Record<string, ApiContract<TSchema>>,
  TPrefix extends string = string,
  TSchema extends RouteSchema = { response: z.ZodType },
> = {
  prefix: TPrefix;
  routes: TRoutes;
};
