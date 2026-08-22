import {
  IdParamSchema,
  GenreInputSchema,
  GenresListResponseSchema,
  GenreResponseSchema,
  CommonListQuerySchema,
} from '@films-collection/shared';
import { createContract } from '../helpers/index.js';

export const genresContract = {
  getList: createContract({
    method: 'GET',
    url: '',
    schema: {
      querystring: CommonListQuerySchema,
      response: GenresListResponseSchema,
    },
  }),
  create: createContract({
    method: 'POST',
    url: '',
    schema: {
      body: GenreInputSchema,
      response: GenreResponseSchema,
    },
  }),
  update: createContract({
    method: 'PATCH',
    url: ':id',
    schema: {
      params: IdParamSchema,
      body: GenreInputSchema,
      response: GenreResponseSchema,
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
};
