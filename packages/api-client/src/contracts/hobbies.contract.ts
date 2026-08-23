import {
  HobbyMutationSchema,
  HobbiesListResponseSchema,
  HobbyResponseSchema,
  IdParamSchema,
  HobbyByIdResponseSchema,
  HobbyByIdQueriesSchema,
} from '@films-collection/shared';
import { createContract } from '../helpers/define-contracts.js';

export const hobbiesContract = {
  getHobbiesList: createContract({
    url: '',
    method: 'GET',
    schema: {
      response: HobbiesListResponseSchema,
    },
  }),
  getHobby: createContract({
    url: ':id',
    method: 'GET',
    schema: {
      params: IdParamSchema,
      querystring: HobbyByIdQueriesSchema,
      response: HobbyByIdResponseSchema,
    },
  }),
  createHobby: createContract({
    url: '',
    method: 'POST',
    schema: {
      body: HobbyMutationSchema,
      response: HobbyResponseSchema,
    },
  }),
  updateHobby: createContract({
    url: ':id',
    method: 'PATCH',
    schema: {
      body: HobbyMutationSchema,
      response: HobbyResponseSchema,
    },
  }),
  deleteHobby: createContract({
    url: ':id',
    method: 'DELETE',
    schema: {
      params: IdParamSchema,
      response: IdParamSchema,
    },
  }),
};
