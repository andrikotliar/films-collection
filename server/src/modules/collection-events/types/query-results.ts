import { CollectionEvent } from '@prisma/client';

export type GetEventQueryResult = Omit<CollectionEvent, 'image' | 'createdAt' | 'updatedAt'>;
