import { kebabToCamelCase } from '@films-collection/shared';
import type { z } from 'zod';
import { contracts } from '~/contracts/index.js';
import { createFetchWrapper, type FetchWrapperOptions } from '~/helpers/index.js';
import type { ApiContract } from '~/types/index.js';

type Contracts = typeof contracts;

type InferSchema<T> = T extends z.ZodType ? z.infer<T> : never;

type BuildExecOptions<S> = (S extends { body: infer B } ? { input: InferSchema<B> } : {}) &
  (S extends { querystring: infer Q } ? { queryParams: InferSchema<Q> } : {}) &
  (S extends { params: infer P } ? { params: InferSchema<P> } : {});

type ExecOptions<S> = keyof BuildExecOptions<S> extends never ? void : BuildExecOptions<S>;

type ApiClient = {
  [K in keyof Contracts as Contracts[K]['prefix']]: {
    [MK in keyof Contracts[K]['routes']]: Contracts[K]['routes'][MK] extends {
      schema: infer S;
    }
      ? {
          staticKey: string;
          exec: (
            options: ExecOptions<S>,
          ) => Promise<S extends { response: infer R } ? z.infer<R> : unknown>;
        }
      : never;
  };
};

type KebabToCamel<S extends string> = S extends `${infer Head}-${infer Tail}`
  ? `${Head}${Capitalize<KebabToCamel<Tail>>}`
  : S;

type KebabKeysToCamelCase<T> = {
  [K in keyof T as K extends string ? KebabToCamel<K> : K]: T[K];
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

  for (const contract of Object.values(contracts)) {
    const camelCasePrefix = kebabToCamelCase(contract.prefix);
    client[camelCasePrefix] = {};
    for (const [methodKey, methodContract] of Object.entries(contract.routes)) {
      const apiPath = `/${contract.prefix}${getUrl(methodContract.url)}`;

      client[camelCasePrefix][methodKey] = {
        staticKey: `${camelCasePrefix}.${methodKey}`,
        exec: (options: Record<string, unknown>) =>
          request<ApiContract['schema']['response']>(methodContract.method, apiPath, options),
      };
    }
  }

  return client as KebabKeysToCamelCase<ApiClient>;
};
