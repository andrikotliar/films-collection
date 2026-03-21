import {
  AuthStateResponseSchema,
  IdParamSchema,
  LoginSchema,
  LogoutResponseSchema,
} from '@films-collection/shared';
import { defineContracts } from '~/helpers';

export const authContract = defineContracts('auth', {
  getState: {
    method: 'GET',
    url: 'state',
    schema: {
      response: AuthStateResponseSchema,
    },
  },
  login: {
    method: 'POST',
    url: 'login',
    schema: {
      body: LoginSchema,
      response: IdParamSchema,
    },
  },
  refresh: {
    method: 'POST',
    url: 'refresh',
    schema: {
      response: IdParamSchema,
    },
  },
  logout: {
    method: 'POST',
    url: 'logout',
    schema: {
      response: LogoutResponseSchema,
    },
  },
});
