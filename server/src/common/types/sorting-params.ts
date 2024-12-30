import { SortOrder } from 'mongoose';

export type SortingParams<T = string> = {
  sortingField?: T;
  sortingDirection?: SortOrder;
};
