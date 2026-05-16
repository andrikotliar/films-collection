import type { z } from 'zod';

export type RouteSchema<
  TBody extends z.ZodType | undefined = undefined,
  TQuery extends z.ZodType | undefined = undefined,
  TParams extends z.ZodType | undefined = undefined,
  TResponse extends z.ZodType = z.ZodType,
> = {
  body?: TBody;
  querystring?: TQuery;
  params?: TParams;
  response: TResponse;
};

export type ApiContract<S extends RouteSchema = { response: z.ZodType }> = {
  method: 'GET' | 'POST' | 'PATCH' | 'PUT' | 'DELETE';
  url: string;
  schema: S;
};

export type ContractDefinition<
  TPrefix extends string,
  TRoutes extends Record<string, ApiContract<any>>,
> = {
  prefix: TPrefix;
  routes: TRoutes;
};
