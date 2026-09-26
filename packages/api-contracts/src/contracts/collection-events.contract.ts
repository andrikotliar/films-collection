import {
  CreateCollectionEventInputSchema,
  UpdateCollectionEventInputSchema,
  IdParamSchema,
  CollectionEventResponseSchema,
  CollectionEventsListResponseSchema,
  CommonListQuerySchema,
} from '@hobbies-collection/shared';
import { createContract } from '../helpers/index.js';

export const collectionEventsContract = {
  create: createContract({
    method: 'POST',
    url: '/collection-events',
    schema: {
      body: CreateCollectionEventInputSchema,
      response: CollectionEventResponseSchema,
    },
  }),
  getList: createContract({
    method: 'GET',
    url: '/collection-events',
    schema: {
      querystring: CommonListQuerySchema,
      response: CollectionEventsListResponseSchema,
    },
  }),
  delete: createContract({
    method: 'DELETE',
    url: '/collection-events/:id',
    schema: {
      params: IdParamSchema,
      response: IdParamSchema,
    },
  }),
  update: createContract({
    method: 'PATCH',
    url: '/collection-events/:id',
    schema: {
      params: IdParamSchema,
      body: UpdateCollectionEventInputSchema,
      response: CollectionEventResponseSchema,
    },
  }),
};
