import type { ApiContract, ContractDefinition, ContractSchema } from '~/types/index.js';

export const createContractsGroup = <
  const TPrefix extends string,
  const TRoutes extends Record<string, ApiContract<ContractSchema>>,
>(
  prefix: TPrefix,
  routes: TRoutes,
): ContractDefinition<TPrefix, TRoutes> => ({
  prefix,
  routes,
});

export const createContract = <T extends ContractSchema>(
  contract: ApiContract<T>,
): ApiContract<T> => contract;
