import { nullable } from '~/shared/helpers/nullable';

export const getFirstValue = <T extends unknown[]>(value: T): T[number] | null => {
  return nullable(value[0]);
};
