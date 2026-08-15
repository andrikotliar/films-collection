import {
  CommonListQuerySchema,
  IdParamSchema,
  StudioInputSchema,
  StudioResponseSchema,
  StudiosResponseSchema,
} from '@films-collection/shared';
import { createContract } from '~/helpers/index.js';

export const studiosContract = {
  getList: createContract({
    method: 'GET',
    url: '',
    schema: {
      querystring: CommonListQuerySchema,
      response: StudiosResponseSchema,
    },
  }),
  create: createContract({
    method: 'POST',
    url: '',
    schema: {
      body: StudioInputSchema,
      response: StudioResponseSchema,
    },
  }),
  update: createContract({
    method: 'PATCH',
    url: ':id',
    schema: {
      params: IdParamSchema,
      body: StudioInputSchema,
      response: StudioResponseSchema,
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
