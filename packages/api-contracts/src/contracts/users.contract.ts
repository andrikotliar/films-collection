import {
  IdParamSchema,
  UpdateUserPasswordInputSchema,
  UpdateUserTranslationPreferencesSchema,
  UserDataResponseSchema,
  UserSessionSchema,
} from '@films-collection/shared';
import { z } from 'zod';
import { createContract } from '../helpers/index.js';

export const usersContracts = {
  getSessions: createContract({
    url: 'sessions',
    method: 'GET',
    schema: {
      response: z.array(UserSessionSchema),
    },
  }),
  terminateSession: createContract({
    url: 'session/:id',
    method: 'DELETE',
    schema: {
      params: IdParamSchema,
      response: IdParamSchema,
    },
  }),
  updatePassword: createContract({
    url: '/password',
    method: 'PATCH',
    schema: {
      body: UpdateUserPasswordInputSchema,
      response: IdParamSchema,
    },
  }),
  updateTranslationPreferences: createContract({
    url: '/translation',
    method: 'PATCH',
    schema: {
      body: UpdateUserTranslationPreferencesSchema,
      response: IdParamSchema,
    },
  }),
  getUser: createContract({
    url: '',
    method: 'GET',
    schema: {
      response: UserDataResponseSchema,
    },
  }),
};
