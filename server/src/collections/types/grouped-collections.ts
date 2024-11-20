import { CollectionType } from '../enums';

type GroupedCollections = {
  [key in CollectionType]: {
    id: string;
    title: string;
  }[];
};

export type { GroupedCollections };
