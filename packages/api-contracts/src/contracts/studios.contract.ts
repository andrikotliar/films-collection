import {
  CommonListQuerySchema,
  IdParamSchema,
  StudioInputSchema,
  StudioResponseSchema,
  StudiosResponseSchema,
} from '@hobbies-collection/shared';
import { createContract } from '../helpers/index.js';

export const studiosContract = {
  getList: createContract({
    method: 'GET',
    url: '/studios',
    schema: {
      querystring: CommonListQuerySchema,
      response: StudiosResponseSchema,
    },
  }),
  create: createContract({
    method: 'POST',
    url: '/studios',
    schema: {
      body: StudioInputSchema,
      response: StudioResponseSchema,
    },
  }),
  update: createContract({
    method: 'PATCH',
    url: '/studios/:id',
    schema: {
      params: IdParamSchema,
      body: StudioInputSchema,
      response: StudioResponseSchema,
    },
  }),
  delete: createContract({
    method: 'DELETE',
    url: '/studios/:id',
    schema: {
      params: IdParamSchema,
      response: IdParamSchema,
    },
  }),
};
