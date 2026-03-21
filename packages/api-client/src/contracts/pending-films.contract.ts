import {
  IdParamSchema,
  CreatePendingFilmInputSchema,
  GetPendingFilmsListQuerySchema,
  UpdatePendingFilmInputSchema,
  PendingFilmsListResponseSchema,
  PendingFilmResponseSchema,
  PendingFilmByIdResponseSchema,
} from '@films-collection/shared';
import { defineContracts } from '~/helpers';

export const pendingFilmsContract = defineContracts('pending-films', {
  getList: {
    method: 'GET',
    url: '',
    schema: {
      querystring: GetPendingFilmsListQuerySchema,
      response: PendingFilmsListResponseSchema,
    },
  },
  getById: {
    method: 'GET',
    url: ':id',
    schema: {
      params: IdParamSchema,
      response: PendingFilmByIdResponseSchema,
    },
  },
  create: {
    method: 'POST',
    url: '',
    schema: {
      body: CreatePendingFilmInputSchema,
      response: PendingFilmResponseSchema,
    },
  },
  update: {
    method: 'PATCH',
    url: ':id',
    schema: {
      params: IdParamSchema,
      body: UpdatePendingFilmInputSchema,
      response: PendingFilmResponseSchema,
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
