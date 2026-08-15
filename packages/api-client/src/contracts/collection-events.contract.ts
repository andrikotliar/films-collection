import {
  CreateCollectionEventInputSchema,
  UpdateCollectionEventInputSchema,
  IdParamSchema,
  CollectionEventResponseSchema,
  CollectionEventsListResponseSchema,
  CommonListQuerySchema,
} from '@films-collection/shared';
import { createContract } from '~/helpers/index.js';

export const collectionEventsContract = {
  create: createContract({
    method: 'POST',
    url: '',
    schema: {
      body: CreateCollectionEventInputSchema,
      response: CollectionEventResponseSchema,
    },
  }),
  getList: createContract({
    method: 'GET',
    url: '',
    schema: {
      querystring: CommonListQuerySchema,
      response: CollectionEventsListResponseSchema,
    },
  }),
  delete: createContract({
    method: 'DELETE',
    url: ':id',
    schema: {
      params: IdParamSchema,
      response: IdParamSchema,
    },
  }),
  update: createContract({
    method: 'PATCH',
    url: ':id',
    schema: {
      params: IdParamSchema,
      body: UpdateCollectionEventInputSchema,
      response: CollectionEventResponseSchema,
    },
  }),
};
