import {
  IdParamSchema,
  StudioInputSchema,
  StudioResponseSchema,
  StudiosResponseSchema,
} from '@films-collection/shared';
import { defineContracts } from '~/helpers';

export const studiosContract = defineContracts('studios', {
  getList: {
    method: 'GET',
    url: '',
    schema: {
      response: StudiosResponseSchema,
    },
  },
  create: {
    method: 'POST',
    url: '',
    schema: {
      body: StudioInputSchema,
      response: StudioResponseSchema,
    },
  },
  update: {
    method: 'PATCH',
    url: ':id',
    schema: {
      params: IdParamSchema,
      body: StudioInputSchema,
      response: StudioResponseSchema,
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
