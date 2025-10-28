import {
  clearCookies,
  getCookie,
  UnauthorizedException,
  defineRoute,
  useRoutes,
  setCookie,
  ACCESS_TOKEN_MAX_AGE_SEC,
  REFRESH_TOKEN_MAX_AGE_SEC,
} from '~/common';
import { AuthLoginSchema } from '../services/auth/schemas';

export const authRoutes = useRoutes('auth', [
  defineRoute({
    method: 'POST',
    url: '/login',
    schema: {
      body: AuthLoginSchema,
    },
    async handler({ request, reply, app }) {
      const data = await app.container.resolve('authService').login(request.body);

      if (!data) {
        throw new UnauthorizedException({
          code: 'INCORRECT_CREDENTIALS',
          message: 'Incorrect credentials',
        });
      }

      await app.container.resolve('usersService').setRefreshToken(data);

      setCookie(reply, {
        name: 'ACCESS_TOKEN',
        value: data.accessToken,
        maxAge: ACCESS_TOKEN_MAX_AGE_SEC,
      });

      setCookie(reply, {
        name: 'REFRESH_TOKEN',
        value: data.refreshToken,
        maxAge: REFRESH_TOKEN_MAX_AGE_SEC,
      });

      return {
        id: data.id,
      };
    },
  }),
  defineRoute({
    method: 'POST',
    url: '/refresh',
    async handler({ request, reply, app }) {
      const token = getCookie(request, 'REFRESH_TOKEN');

      if (!token) {
        throw new UnauthorizedException();
      }

      const data = await app.container.resolve('authService').refreshTokens(token);

      if (!data) {
        throw new UnauthorizedException({
          code: 'INVALID_TOKEN',
        });
      }

      setCookie(reply, {
        name: 'ACCESS_TOKEN',
        value: data.accessToken,
        maxAge: ACCESS_TOKEN_MAX_AGE_SEC,
      });

      setCookie(reply, {
        name: 'REFRESH_TOKEN',
        value: data.refreshToken,
        maxAge: REFRESH_TOKEN_MAX_AGE_SEC,
      });

      await app.container.resolve('usersService').setRefreshToken(data);

      return {
        id: data.id,
      };
    },
  }),
  defineRoute({
    method: 'POST',
    url: '/logout',
    async handler({ request, reply, app }) {
      const accessToken = getCookie(request, 'ACCESS_TOKEN');

      if (accessToken) {
        await app.container.resolve('authService').logout(accessToken, request.server.jwt);
      }

      clearCookies(reply, ['ACCESS_TOKEN', 'REFRESH_TOKEN']);

      return { status: 'ok' };
    },
  }),
]);
