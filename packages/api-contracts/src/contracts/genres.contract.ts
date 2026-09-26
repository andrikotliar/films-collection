import {
  IdParamSchema,
  GenreInputSchema,
  GenresListResponseSchema,
  GenreResponseSchema,
  CommonListQuerySchema,
} from '@hobbies-collection/shared';
import { createContract } from '../helpers/index.js';

export const genresContract = {
  getList: createContract({
    method: 'GET',
    url: '/genres',
    schema: {
      querystring: CommonListQuerySchema,
      response: GenresListResponseSchema,
    },
  }),
  create: createContract({
    method: 'POST',
    url: '/genres',
    schema: {
      body: GenreInputSchema,
      response: GenreResponseSchema,
    },
  }),
  update: createContract({
    method: 'PATCH',
    url: '/genres/:id',
    schema: {
      params: IdParamSchema,
      body: GenreInputSchema,
      response: GenreResponseSchema,
    },
  }),
  delete: createContract({
    method: 'DELETE',
    url: '/genres/:id',
    schema: {
      params: IdParamSchema,
      response: IdParamSchema,
    },
  }),
};
