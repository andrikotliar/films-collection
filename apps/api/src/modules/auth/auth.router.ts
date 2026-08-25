import { contracts } from '@films-collection/api-client';
import { UnauthorizedException } from '~/shared/exceptions/unauthorized.js';
import { createRouter } from '~/shared/helpers/create-router.js';
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
      const data = await app.resolve('authService').login({
        ...request.body,
        userAgent: request.headers['user-agent'],
      });

      if (!data) {
        throw new UnauthorizedException({
          code: 'INCORRECT_CREDENTIALS',
          message: 'Incorrect credentials',
        });
      }

      const cookiesService = app.resolve('cookiesService').inject(reply);

      cookiesService.setCookie('ACCESS_TOKEN', data.accessToken);
      cookiesService.setCookie('REFRESH_TOKEN', data.refreshToken);
      cookiesService.setCookie('SESSION_ID', data.sessionId);

      return {
        data: { id: data.id },
      };
    },
  },
  refresh: {
    async handler({ request, reply, app }) {
      const cookiesService = app.resolve('cookiesService').inject(reply);

      const token = cookiesService.getCookieFromRequest(request, 'REFRESH_TOKEN');
      const sessionId = cookiesService.getCookieFromRequest(request, 'SESSION_ID');

      if (!token || !sessionId) {
        throw new UnauthorizedException();
      }

      const data = await app.resolve('authService').refreshTokens(token, sessionId);

      if (!data) {
        throw new UnauthorizedException({
          code: 'INVALID_TOKEN',
        });
      }

      cookiesService.setCookie('ACCESS_TOKEN', data.accessToken);
      cookiesService.setCookie('REFRESH_TOKEN', data.refreshToken);

      return {
        data: { id: data.id },
      };
    },
  },
  logout: {
    async handler({ request, reply, app }) {
      const cookiesService = app.resolve('cookiesService').inject(reply);

      const accessToken = cookiesService.getCookieFromRequest(request, 'ACCESS_TOKEN');
      const sessionId = cookiesService.getCookieFromRequest(request, 'SESSION_ID');

      if (accessToken && sessionId) {
        await app.resolve('authService').logout(accessToken, sessionId);
      }

      cookiesService.clearCookies(['ACCESS_TOKEN', 'REFRESH_TOKEN', 'SESSION_ID']);

      return { data: { status: 'ok' as const } };
    },
  },
});
