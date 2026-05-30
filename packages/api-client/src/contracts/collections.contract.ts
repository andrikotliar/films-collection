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
import { defineContracts } from '~/helpers/index.js';

export const collectionsContract = defineContracts('collections', {
  getList: {
    method: 'GET',
    url: '',
    schema: {
      querystring: CommonListQuerySchema,
      response: CollectionsListResponseSchema,
    },
  },
  create: {
    method: 'POST',
    url: '',
    schema: {
      body: CreateCollectionInputSchema,
      response: CollectionResponseSchema,
    },
  },
  update: {
    method: 'PATCH',
    url: ':id',
    schema: {
      params: IdParamSchema,
      body: UpdateCollectionInputSchema,
      response: CollectionResponseSchema,
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
  getAll: {
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
  },
});
