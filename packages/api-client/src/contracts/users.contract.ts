import {
  IdParamSchema,
  UpdateUserPasswordInputSchema,
  UpdateUserTranslationPreferencesSchema,
  UserDataResponseSchema,
  UserSessionSchema,
} from '@films-collection/shared';
import { z } from 'zod';
import { defineContracts } from '~/helpers/index.js';

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
    url: '/password',
    method: 'PATCH',
    schema: {
      body: UpdateUserPasswordInputSchema,
      response: IdParamSchema,
    },
  },
  updateTranslationPreferences: {
    url: '/translation',
    method: 'PATCH',
    schema: {
      body: UpdateUserTranslationPreferencesSchema,
      response: IdParamSchema,
    },
  },
  getUser: {
    url: '',
    method: 'GET',
    schema: {
      response: UserDataResponseSchema,
    },
  },
});
