import type { SuccessResult } from '~/types';

export const okResponse = <T>(data: unknown): SuccessResult<T> => ({
  ok: true,
  data: data as T,
});
