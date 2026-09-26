import type { ApiContract, ContractSchema } from '../types/index.js';

export const createContract = <T extends ContractSchema>(
  contract: ApiContract<T>,
): ApiContract<T> => contract;
