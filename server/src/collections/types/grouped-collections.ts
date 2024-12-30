import { CollectionType } from '../enums';

export type GroupedCollections = {
  [key in CollectionType]: {
    id: string;
    title: string;
  }[];
};
