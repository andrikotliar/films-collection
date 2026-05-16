import type { ApiContract, ContractDefinition } from '~/types';

export const defineContracts = <
  const TPrefix extends string,
  const TRoutes extends Record<string, ApiContract<any>>,
>(
  prefix: TPrefix,
  routes: TRoutes,
): ContractDefinition<TPrefix, TRoutes> => ({
  prefix,
  routes,
});
