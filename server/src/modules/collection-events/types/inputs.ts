import { CollectionEvent } from '@prisma/client';

export type EventDate = {
  month: number;
  date: number;
};

export type EventInput = Pick<
  CollectionEvent,
  'title' | 'collectionId' | 'image'
> & {
  startDate: EventDate;
  endDate: EventDate;
};

export type UpdateEventInput = Partial<Omit<CollectionEvent, 'id'>>;
