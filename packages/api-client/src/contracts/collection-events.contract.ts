import {
  CreateCollectionEventInputSchema,
  UpdateCollectionEventInputSchema,
  IdParamSchema,
  CollectionEventResponseSchema,
  CollectionEventsListResponseSchema,
} from '@films-collection/shared';
import { defineContracts } from '~/helpers';

export const collectionEventsContract = defineContracts('collection-events', {
  create: {
    method: 'POST',
    url: '',
    schema: {
      body: CreateCollectionEventInputSchema,
      response: CollectionEventResponseSchema,
    },
  },
  getAll: {
    method: 'GET',
    url: '',
    schema: {
      response: CollectionEventsListResponseSchema,
    },
  },
  delete: {
    method: 'DELETE',
    url: ':id',
    schema: {
      params: IdParamSchema,
      response: IdParamSchema,
    },
  },
  update: {
    method: 'PATCH',
    url: ':id',
    schema: {
      params: IdParamSchema,
      body: UpdateCollectionEventInputSchema,
      response: CollectionEventResponseSchema,
    },
  },
});
