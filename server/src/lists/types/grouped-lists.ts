import { ListType } from '../enums';

type GroupedLists = {
  [key in ListType]: string[];
};

export type { GroupedLists };
