import { CollectionType } from '@/enums';

export type Collection = {
  _id: string;
  type: CollectionType;
  title: string;
  description: string;
};
