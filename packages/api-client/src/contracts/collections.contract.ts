import {
  IdParamSchema,
  CreateCollectionInputSchema,
  UpdateCollectionInputSchema,
  CollectionsListResponseSchema,
  CollectionResponseSchema,
} from '@films-collection/shared';
import { defineContracts } from '~/helpers';

export const collectionsContract = defineContracts('collections', {
  getList: {
    method: 'GET',
    url: '',
    schema: {
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
});
