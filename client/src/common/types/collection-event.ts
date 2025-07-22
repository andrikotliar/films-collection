import type { BackgroundData } from '@/components';
import type { Collection } from './collection';

export type CollectionEvent = {
  id: number;
  title: string;
  collectionId: number;
  startDate: number;
  startMonth: number;
  endDate: number;
  endMonth: number;
  description: string | null;
  background: BackgroundData;
  yearFrom: number | null;
};

export type BaseCollectionEvent = Pick<
  CollectionEvent,
  'title' | 'collectionId'
>;

export type CollectionEventFilled = CollectionEvent & {
  collection: Pick<Collection, 'id' | 'title'>;
};
