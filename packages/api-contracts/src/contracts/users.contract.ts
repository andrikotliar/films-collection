import {
  IdParamSchema,
  UpdateUserPasswordInputSchema,
  UpdateUserTranslationPreferencesSchema,
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
  updatePassword: createContract({
    url: '/users/password',
    method: 'PATCH',
    schema: {
      body: UpdateUserPasswordInputSchema,
      response: IdParamSchema,
    },
  }),
  updateTranslationPreferences: createContract({
    url: '/users/translation',
    method: 'PATCH',
    schema: {
      body: UpdateUserTranslationPreferencesSchema,
      response: IdParamSchema,
    },
  }),
  getUser: createContract({
    url: '/users',
    method: 'GET',
    schema: {
      response: UserDataResponseSchema,
    },
  }),
};
