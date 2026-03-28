import type z from 'zod';
import type { ApiContract, ContractDefinition, RouteSchema } from '~/types';

export const defineContracts = <
  TRoutes extends Record<string, ApiContract<TSchema>>,
  TPrefix extends string = string,
  TSchema extends RouteSchema = { response: z.ZodType },
>(
  prefix: TPrefix,
  routes: TRoutes,
): ContractDefinition<TRoutes, TPrefix, TSchema> => ({
  prefix,
  routes,
});
