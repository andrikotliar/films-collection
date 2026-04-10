import { usersContracts } from '@films-collection/api-client';
import { createRouter, getCookie, UnauthorizedException, validateAuth } from '~/shared';

export const usersRouter = createRouter(usersContracts, {
  getSessions: {
    preHandler: [validateAuth],
    async handler({ request, app }) {
      const token = getCookie(request, 'ACCESS_TOKEN');
      const sessionId = getCookie(request, 'SESSION_ID');

      if (!token || !sessionId) {
        throw new UnauthorizedException({ code: 'TOKEN_MISSED' });
      }

      const data = await app.container.resolve('usersService').getUserSessions(token, sessionId);

      return { data };
    },
  },
  terminateSession: {
    preHandler: [validateAuth],
    async handler({ request, app }) {
      await app.container.resolve('usersService').terminateSession(request.params.id);

      return {
        data: { id: request.params.id },
      };
    },
  },
  updatePassword: {
    preHandler: [validateAuth],
    async handler({ request, app }) {
      const token = getCookie(request, 'ACCESS_TOKEN');
      if (!token) {
        throw new UnauthorizedException({
          code: 'TOKEN_MISSED',
        });
      }

      const data = await app.container.resolve('usersService').updatePassword(token, request.body);

      return {
        data: { id: data.userId },
      };
    },
  },
});
