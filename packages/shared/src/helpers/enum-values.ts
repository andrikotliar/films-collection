import type { Enum } from '~/types';

export const enumValues = <T extends { [x: string]: Enum<T> }>(enumObject: T): Array<Enum<T>> => {
  return Object.values(enumObject);
};
