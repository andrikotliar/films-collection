import { CollectionType } from '../enums';

type Collection = {
  _id: string;
  type: CollectionType;
  title: string;
  description?: string;
};

export type { Collection };
