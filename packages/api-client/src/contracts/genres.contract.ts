import {
  IdParamSchema,
  GenreInputSchema,
  GenresListResponseSchema,
  GenreResponseSchema,
} from '@films-collection/shared';
import { defineContracts } from '~/helpers';

export const genresContract = defineContracts('genres', {
  getList: {
    method: 'GET',
    url: '',
    schema: {
      response: GenresListResponseSchema,
    },
  },
  create: {
    method: 'POST',
    url: '',
    schema: {
      body: GenreInputSchema,
      response: GenreResponseSchema,
    },
  },
  update: {
    method: 'PATCH',
    url: ':id',
    schema: {
      params: IdParamSchema,
      body: GenreInputSchema,
      response: GenreResponseSchema,
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
