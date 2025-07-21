import { Collection } from './collection';

export type CollectionEvent = {
  id: number;
  title: string;
  image: string;
  collectionId: number;
  startDate: number;
  startMonth: number;
  endDate: number;
  endMonth: number;
  description: string | null;
  background: string;
};

export type BaseCollectionEvent = Pick<
  CollectionEvent,
  'title' | 'image' | 'collectionId'
>;

export type CollectionEventFilled = CollectionEvent & {
  collection: Pick<Collection, 'id' | 'title'>;
};
