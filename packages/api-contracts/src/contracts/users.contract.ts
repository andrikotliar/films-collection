import {
  IdParamSchema,
  UpdateUserSchema,
  UserDataResponseSchema,
  UserSessionSchema,
} from '@hobbies-collection/shared';
import { z } from 'zod';
import { createContract } from '../helpers/index.js';

export const usersContracts = {
  getSessions: createContract({
    url: '/users/sessions',
    method: 'GET',
    schema: {
      response: z.array(UserSessionSchema),
    },
  }),
  terminateSession: createContract({
    url: '/users/session/:id',
    method: 'DELETE',
    schema: {
      params: IdParamSchema,
      response: IdParamSchema,
    },
  }),
  update: createContract({
    url: '/users/me',
    method: 'PATCH',
    schema: {
      body: UpdateUserSchema,
      response: IdParamSchema,
    },
  }),
  getUser: createContract({
    url: '/users/me',
    method: 'GET',
    schema: {
      response: UserDataResponseSchema,
    },
  }),
};
