import {
  clearCookies,
  getCookie,
  UnauthorizedException,
  defineRoute,
  useRoutes,
  setCookie,
  ACCESS_TOKEN_MAX_AGE_SEC,
  REFRESH_TOKEN_MAX_AGE_SEC,
} from 'src/common';
import { AuthLoginSchema } from './schemas';
import { auth } from 'src/modules/auth/auth.module';
import { users } from 'src/modules/users/users.module';

export const authRoutes = useRoutes('auth', [
  defineRoute({
    method: 'POST',
    url: '/login',
    schema: {
      body: AuthLoginSchema,
    },
    async handler({ request, reply }) {
      const data = await auth.login(request.body, request.server.jwt);

      if (!data) {
        throw new UnauthorizedException({
          code: 'INCORRECT_CREDENTIALS',
          message: 'Incorrect credentials',
        });
      }

      await users.setRefreshToken(data);

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
        userId: data.id,
      };
    },
  }),
  defineRoute({
    method: 'GET',
    url: '/state',
    async handler({ request, reply }) {
      const accessToken = getCookie(request, 'ACCESS_TOKEN');
      const refreshToken = getCookie(request, 'REFRESH_TOKEN');

      const data = await auth.checkAuthStatus({ accessToken, refreshToken }, request.server.jwt);

      if (!data) {
        clearCookies(reply, ['ACCESS_TOKEN', 'REFRESH_TOKEN']);
        throw new UnauthorizedException({
          code: 'INCORRECT_CREDENTIALS',
          message: 'Incorrect credentials',
        });
      }

      if (data.newTokens) {
        setCookie(reply, {
          name: 'ACCESS_TOKEN',
          value: data.newTokens.accessToken,
          maxAge: ACCESS_TOKEN_MAX_AGE_SEC,
        });
        setCookie(reply, {
          name: 'REFRESH_TOKEN',
          value: data.newTokens.accessToken,
          maxAge: REFRESH_TOKEN_MAX_AGE_SEC,
        });
      }

      return {
        id: data.id,
      };
    },
  }),
  defineRoute({
    method: 'POST',
    url: '/logout',
    async handler({ request, reply }) {
      const accessToken = getCookie(request, 'ACCESS_TOKEN');

      if (accessToken) {
        await auth.logout(accessToken, request.server.jwt);
      }

      clearCookies(reply, ['ACCESS_TOKEN', 'REFRESH_TOKEN']);

      return { status: 'ok' };
    },
  }),
]);
