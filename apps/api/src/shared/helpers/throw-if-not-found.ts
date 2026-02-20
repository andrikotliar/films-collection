import { NotFoundException } from '~/shared/exceptions';

export const throwIfNotFound = async <T extends Promise<Record<string, any> | null | undefined>>(
  promise: T,
): Promise<NonNullable<Awaited<T>>> => {
  const result = await promise;
  if (result === null || result === undefined) {
    throw new NotFoundException();
  }

  return result;
};
