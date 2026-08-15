import {
  AuthStateResponseSchema,
  IdParamSchema,
  LoginSchema,
  LogoutResponseSchema,
} from '@films-collection/shared';
import { createContract } from '~/helpers/index.js';

export const authContract = {
  getState: createContract({
    method: 'GET',
    url: 'state',
    schema: {
      response: AuthStateResponseSchema,
    },
  }),
  login: createContract({
    method: 'POST',
    url: 'login',
    schema: {
      body: LoginSchema,
      response: IdParamSchema,
    },
  }),
  refresh: createContract({
    method: 'POST',
    url: 'refresh',
    schema: {
      response: IdParamSchema,
    },
  }),
  logout: createContract({
    method: 'POST',
    url: 'logout',
    schema: {
      response: LogoutResponseSchema,
    },
  }),
};
