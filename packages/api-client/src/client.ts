import { getTypedEntries } from '@films-collection/shared';
import type { z } from 'zod';
import { contracts } from './contracts/index.js';
import { createFetchWrapper, type FetchWrapperOptions } from './helpers/index.js';
import type { ApiContract, ContractSchema } from './types/index.js';

type Contracts = typeof contracts;

type InferSchema<T> = T extends z.ZodType ? z.infer<T> : never;

type BuildExecOptions<S> = (S extends { body: infer B } ? { input: InferSchema<B> } : {}) &
  (S extends { querystring: infer Q } ? { queryParams: InferSchema<Q> } : {}) &
  (S extends { params: infer P } ? { params: InferSchema<P> } : {});

type ExecOptions<S> = keyof BuildExecOptions<S> extends never ? undefined : BuildExecOptions<S>;

type ApiClient = {
  [K in keyof Contracts]: {
    [MK in keyof Contracts[K]['routes']]: Contracts[K]['routes'][MK] extends {
      schema: infer S;
    }
      ? ExecOptions<S> extends undefined
        ? () => Promise<S extends { response: infer R } ? z.infer<R> : unknown>
        : (
            options: ExecOptions<S>,
          ) => Promise<S extends { response: infer R } ? z.infer<R> : unknown>
      : never;
  };
};

const getUrl = (value: string) => {
  if (!value.length || value.startsWith('/')) {
    return value;
  }

  return `/${value}`;
};

export const createApiClient = (fetchOptions: FetchWrapperOptions) => {
  const client: Record<string, any> = {};
  const request = createFetchWrapper(fetchOptions);

  for (const [prefix, contract] of getTypedEntries(contracts)) {
    client[prefix] = {};
    for (const [methodKey, methodContract] of Object.entries(contract.routes)) {
      const apiPath = `/${contract.prefix}${getUrl(methodContract.url)}`;

      client[prefix][methodKey] = (options: Record<string, unknown>) =>
        request<ApiContract<ContractSchema>['schema']['response']>(
          methodContract.method,
          apiPath,
          options,
        );
    }
  }

  return client as ApiClient;
};
