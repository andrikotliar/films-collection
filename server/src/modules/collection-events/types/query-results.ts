import { CollectionEvent } from '@prisma/client';

export type GetEventQueryResult = Pick<CollectionEvent, 'title' | 'image'> & {
  collectionId: number;
};
