import { contracts } from '@films-collection/api-client';
import { ACCESS_TOKEN_MAX_AGE_SEC, REFRESH_TOKEN_MAX_AGE_SEC } from '~/shared/constants/index.js';
import { UnauthorizedException } from '~/shared/exceptions/unauthorized.js';
import { clearCookies } from '~/shared/helpers/clear-cookies.js';
import { createRouter } from '~/shared/helpers/create-router.js';
import { getCookie } from '~/shared/helpers/get-cookie.js';
import { setCookie } from '~/shared/helpers/set-cookie.js';
import { validateAuth } from '~/shared/pre-handlers/validate-auth.js';

export const authRouter = createRouter(contracts.auth, {
  getState: {
    preHandler: [validateAuth],
    async handler() {
      return {
        data: {
          isAuthenticated: true,
        },
      };
    },
  },
  login: {
    async handler({ request, reply, app }) {
      const data = await app.container
        .resolve('authService')
        .login({ ...request.body, userAgent: request.headers['user-agent'] });

      if (!data) {
        throw new UnauthorizedException({
          code: 'INCORRECT_CREDENTIALS',
          message: 'Incorrect credentials',
        });
      }

      const configService = app.container.resolve('configService');

      const deps = { ConfigService: configService };

      setCookie(reply, {
        name: 'ACCESS_TOKEN',
        value: data.accessToken,
        maxAge: ACCESS_TOKEN_MAX_AGE_SEC,
        deps,
      });

      setCookie(reply, {
        name: 'REFRESH_TOKEN',
        value: data.refreshToken,
        maxAge: REFRESH_TOKEN_MAX_AGE_SEC,
        deps,
      });

      setCookie(reply, {
        name: 'SESSION_ID',
        value: data.sessionId,
        maxAge: REFRESH_TOKEN_MAX_AGE_SEC,
        deps,
      });

      return {
        data: { id: data.id },
      };
    },
  },
  refresh: {
    async handler({ request, reply, app }) {
      const token = getCookie(request, 'REFRESH_TOKEN');
      const sessionId = getCookie(request, 'SESSION_ID');

      if (!token || !sessionId) {
        throw new UnauthorizedException();
      }

      const data = await app.container.resolve('authService').refreshTokens(token, sessionId);

      if (!data) {
        throw new UnauthorizedException({
          code: 'INVALID_TOKEN',
        });
      }

      const configService = app.container.resolve('configService');

      setCookie(reply, {
        name: 'ACCESS_TOKEN',
        value: data.accessToken,
        maxAge: ACCESS_TOKEN_MAX_AGE_SEC,
        configService,
      });

      setCookie(reply, {
        name: 'REFRESH_TOKEN',
        value: data.refreshToken,
        maxAge: REFRESH_TOKEN_MAX_AGE_SEC,
        configService,
      });

      return {
        data: { id: data.id },
      };
    },
  },
  logout: {
    async handler({ request, reply, app }) {
      const accessToken = getCookie(request, 'ACCESS_TOKEN');
      const sessionId = getCookie(request, 'SESSION_ID');

      if (accessToken && sessionId) {
        await app.container.resolve('authService').logout(accessToken, sessionId);
      }

      clearCookies(reply, ['ACCESS_TOKEN', 'REFRESH_TOKEN', 'SESSION_ID']);

      return { data: { status: 'ok' as const } };
    },
  },
});
