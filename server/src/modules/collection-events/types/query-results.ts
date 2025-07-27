import { CollectionEvent } from '@prisma/client';

export type GetEventQueryResult = Omit<CollectionEvent, 'createdAt' | 'updatedAt'>;
