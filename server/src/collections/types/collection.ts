import { CollectionType } from '../enums';

type Collection = {
  _id: string;
  type: CollectionType;
  title: string;
  description?: string;
  createdAt: Date;
};

export type { Collection };
