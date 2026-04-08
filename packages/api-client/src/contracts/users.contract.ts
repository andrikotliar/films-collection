import {
  IdParamSchema,
  UpdateUserPasswordInputSchema,
  UserSessionSchema,
} from '@films-collection/shared';
import z from 'zod';
import { defineContracts } from '~/helpers';

export const usersContracts = defineContracts('users', {
  getSessions: {
    url: 'sessions',
    method: 'GET',
    schema: {
      response: z.array(UserSessionSchema),
    },
  },
  terminateSession: {
    url: 'session/:id',
    method: 'DELETE',
    schema: {
      params: IdParamSchema,
      response: IdParamSchema,
    },
  },
  updatePassword: {
    url: '',
    method: 'PATCH',
    schema: {
      body: UpdateUserPasswordInputSchema,
      response: IdParamSchema,
    },
  },
});
