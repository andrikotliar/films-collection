import {
  AuthStateResponseSchema,
  IdParamSchema,
  LoginSchema,
  LogoutResponseSchema,
} from '@hobbies-collection/shared';
import { createContract } from '../helpers/index.js';

export const authContract = {
  getState: createContract({
    method: 'GET',
    url: '/auth/state',
    schema: {
      response: AuthStateResponseSchema,
    },
  }),
  login: createContract({
    method: 'POST',
    url: '/auth/login',
    schema: {
      body: LoginSchema,
      response: IdParamSchema,
    },
  }),
  refresh: createContract({
    method: 'POST',
    url: '/auth/refresh',
    schema: {
      response: IdParamSchema,
    },
  }),
  logout: createContract({
    method: 'POST',
    url: '/auth/logout',
    schema: {
      response: LogoutResponseSchema,
    },
  }),
};
