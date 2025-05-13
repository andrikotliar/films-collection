import {
  clearCookies,
  MAX_AGE_24_HOURS,
  MAX_AGE_7_DAYS,
  getCookie,
  router,
  setCookies,
  UnauthorizedException,
} from 'src/common';
import { AuthLoginSchema, AuthRegisterSchema } from './schemas';

export const AuthController = router((app, defineRoute) => [
  defineRoute({
    method: 'POST',
    url: '/login',
    schema: {
      body: AuthLoginSchema,
    },
    async handler({ request, reply }) {
      const data = await app.authService.login(request.body);

      if (!data) {
        throw new UnauthorizedException({
          code: 'INCORRECT_CREDENTIALS',
          message: 'Incorrect credentials',
        });
      }

      setCookies(reply, [
        {
          name: 'ACCESS_TOKEN',
          value: data.accessToken,
          maxAge: MAX_AGE_24_HOURS,
        },
        {
          name: 'REFRESH_TOKEN',
          value: data.refreshToken,
          maxAge: MAX_AGE_7_DAYS,
        },
      ]);

      return {
        status: 'OK',
        data: {
          userId: data.userId,
        },
      };
    },
  }),
  defineRoute({
    method: 'POST',
    url: '/register',
    schema: {
      body: AuthRegisterSchema,
    },
    async handler({ request }) {
      const createdUser = await app.authService.register(request.body);

      return {
        status: 'CREATED',
        data: createdUser,
      };
    },
  }),
  defineRoute({
    method: 'POST',
    url: '/refresh',
    async handler({ request, reply }) {
      const token = getCookie(request, 'REFRESH_TOKEN');

      if (!token) {
        throw new UnauthorizedException();
      }

      const result = await app.authService.refreshTokens(token);

      if (!result) {
        throw new UnauthorizedException({
          code: 'INVALID_TOKEN',
        });
      }

      setCookies(reply, [
        {
          name: 'ACCESS_TOKEN',
          value: result.accessToken,
          maxAge: MAX_AGE_24_HOURS,
        },
        {
          name: 'REFRESH_TOKEN',
          value: result.refreshToken,
          maxAge: MAX_AGE_7_DAYS,
        },
      ]);

      return {
        status: 'OK',
        data: {
          userId: result.userId,
        },
      };
    },
  }),
  defineRoute({
    method: 'POST',
    url: '/logout',
    async handler({ request, reply }) {
      const accessToken = getCookie(request, 'ACCESS_TOKEN');

      if (accessToken) {
        await app.authService.logout(accessToken);
      }

      clearCookies(reply, ['ACCESS_TOKEN', 'REFRESH_TOKEN']);

      return {
        status: 'OK',
        data: { status: 'ok' },
      };
    },
  }),
]);
