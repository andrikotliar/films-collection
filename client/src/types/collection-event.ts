import { Collection } from '@/types/collection';

export type CollectionEvent = {
  id: number;
  title: string;
  image: string;
  collectionId: number;
  startDateCode: number;
  endDateCode: number;
};

export type BaseCollectionEvent = Pick<
  CollectionEvent,
  'title' | 'image' | 'collectionId'
>;

export type CollectionEventFilled = CollectionEvent & {
  collection: Pick<Collection, 'id' | 'title'>;
};

type CollectionEventDate = {
  month: number;
  date: number;
};

export type CollectionEventPayload = Omit<
  CollectionEvent,
  'id' | 'startDateCode' | 'endDateCode'
> & {
  startDate: CollectionEventDate;
  endDate: CollectionEventDate;
};
