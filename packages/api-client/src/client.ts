import { kebabToCamelCase } from '@films-collection/shared';
import type { z } from 'zod';
import * as contracts from '~/contracts';
import { createFetchWrapper, type FetchWrapperOptions } from '~/helpers';
import type { ApiContract } from '~/types';

type Contracts = typeof contracts;

type ExecOptions<S> = S extends { body: infer B; querystring: infer Q; params: infer P }
  ? {
      input: B extends z.ZodTypeAny ? z.infer<B> : never;
      queryParams: Q extends z.ZodTypeAny ? z.infer<Q> : never;
      params: P extends z.ZodTypeAny ? z.infer<P> : never;
    }
  : S extends { body: infer B; querystring: infer Q }
  ? {
      input: B extends z.ZodTypeAny ? z.infer<B> : never;
      queryParams: Q extends z.ZodTypeAny ? z.infer<Q> : never;
    }
  : S extends { body: infer B; params: infer P }
  ? {
      input: B extends z.ZodTypeAny ? z.infer<B> : never;
      params: P extends z.ZodTypeAny ? z.infer<P> : never;
    }
  : S extends { querystring: infer Q; params: infer P }
  ? {
      queryParams: Q extends z.ZodTypeAny ? z.infer<Q> : never;
      params: P extends z.ZodTypeAny ? z.infer<P> : never;
    }
  : S extends { body: infer B }
  ? { input: z.infer<B> }
  : S extends { querystring: infer Q }
  ? { queryParams: z.infer<Q> }
  : S extends { params: infer P }
  ? { params: z.infer<P> }
  : void;

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

const clearUrl = (value: string) => {
  if (value.startsWith('/')) {
    return value.slice(1);
  }

  return value;
};

export const createApiClient = (fetchOptions: FetchWrapperOptions) => {
  const client: Record<string, any> = {};
  const request = createFetchWrapper(fetchOptions);

  for (const contract of Object.values(contracts)) {
    const camelCasePrefix = kebabToCamelCase(contract.prefix);
    client[camelCasePrefix] = {};
    for (const [methodKey, methodContract] of Object.entries(contract.routes)) {
      const apiPath = `/${contract.prefix}/${clearUrl(methodContract.url)}`;

      client[camelCasePrefix][methodKey] = {
        staticKey: `${camelCasePrefix}.${methodKey}`,
        exec: (options: Record<string, unknown>) =>
          request<ApiContract['schema']['response']>(methodContract.method, apiPath, options),
      };
    }
  }

  return client as KebabKeysToCamelCase<ApiClient>;
};
