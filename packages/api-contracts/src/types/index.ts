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

export type ContractSchema = {
  response: z.ZodType;
  body?: z.ZodType;
  querystring?: z.ZodType;
  params?: z.ZodType;
};

type Exact<T, Shape> = T & Record<Exclude<keyof T, keyof Shape>, never>;

export type ApiContract<S extends ContractSchema> = {
  method: 'GET' | 'POST' | 'PATCH' | 'PUT' | 'DELETE';
  url: string;
  schema: Exact<S, ContractSchema>;
};

export type ContractDefinition<
  TPrefix extends string,
  TRoutes extends Record<string, ApiContract<ContractSchema>>,
> = {
  prefix: TPrefix;
  routes: TRoutes;
};
