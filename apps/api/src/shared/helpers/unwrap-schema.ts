import type { RouteSchema } from '~/shared/types';

export const unwrapSchema = <S extends RouteSchema | undefined>(schema?: S) => {
  if (!schema) return undefined;

  return {
    body: schema.body?.value,
    querystring: schema.querystring?.value,
    params: schema.params?.value,
    response: schema.response?.value,
  };
};
