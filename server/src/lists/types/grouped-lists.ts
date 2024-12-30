import { ListType } from '../enums';

export type GroupedLists = {
  [key in ListType]: string[];
};
