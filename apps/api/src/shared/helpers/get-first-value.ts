import { nullable } from '~/shared/helpers/nullable';

export const getFirstValue = async <T>(promise: Promise<T[]>): Promise<T | null> => {
  const result = await promise;
  return nullable(result[0]);
};
