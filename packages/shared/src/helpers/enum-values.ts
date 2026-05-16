import type { Enum } from '~/types/enum.type.js';

export const enumValues = <T extends { [x: string]: Enum<T> }>(enumObject: T): Array<Enum<T>> => {
  return Object.values(enumObject);
};
