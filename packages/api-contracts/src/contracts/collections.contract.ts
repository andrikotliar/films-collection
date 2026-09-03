import {
  IdParamSchema,
  CreateCollectionInputSchema,
  UpdateCollectionInputSchema,
  CollectionsListResponseSchema,
  CollectionResponseSchema,
  CommonListQuerySchema,
  buildListOptionSchema,
  CollectionCategory,
} from '@films-collection/shared';
import z from 'zod';
import { createContract } from '../helpers/index.js';

export const collectionsContract = {
  getList: createContract({
    method: 'GET',
    url: '',
    schema: {
      querystring: CommonListQuerySchema,
      response: CollectionsListResponseSchema,
    },
  }),
  create: createContract({
    method: 'POST',
    url: '',
    schema: {
      body: CreateCollectionInputSchema,
      response: CollectionResponseSchema,
    },
  }),
  update: createContract({
    method: 'PATCH',
    url: ':id',
    schema: {
      params: IdParamSchema,
      body: UpdateCollectionInputSchema,
      response: CollectionResponseSchema,
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
  getAll: createContract({
    method: 'GET',
    url: 'all',
    schema: {
      response: buildListOptionSchema(
        z.number(),
        z.object({
          category: z.enum(CollectionCategory),
        }),
      ),
    },
  }),
};
