import {
  CreateCollectionEventInputSchema,
  UpdateCollectionEventInputSchema,
  IdParamSchema,
  CollectionEventResponseSchema,
  CollectionEventsListResponseSchema,
  CommonListQuerySchema,
} from '@films-collection/shared';
import { defineContracts } from '~/helpers/index.js';

export const collectionEventsContract = defineContracts('collection-events', {
  create: {
    method: 'POST',
    url: '',
    schema: {
      body: CreateCollectionEventInputSchema,
      response: CollectionEventResponseSchema,
    },
  },
  getList: {
    method: 'GET',
    url: '',
    schema: {
      querystring: CommonListQuerySchema,
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
