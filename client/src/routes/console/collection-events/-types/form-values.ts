import { CollectionEventDate } from '@/common';

export type FormValues = {
  title: string;
  startDate: CollectionEventDate;
  endDate: CollectionEventDate;
  image: any;
  collectionId: number;
};
