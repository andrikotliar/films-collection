import { usersContracts } from '@films-collection/api-client';
import { createRouter, getCookie, UnauthorizedException, validateAuth } from '~/shared';

export const usersRouter = createRouter(usersContracts, {
  getSessions: {
    preHandler: [validateAuth],
    async handler({ request, app }) {
      const token = getCookie(request, 'ACCESS_TOKEN');

      if (!token) {
        throw new UnauthorizedException();
      }

      const data = await app.container.resolve('usersService').getUserSessions(token);

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
        throw new UnauthorizedException();
      }

      const data = await app.container.resolve('usersService').updatePassword(token, request.body);

      return {
        data: { id: data.userId },
      };
    },
  },
});
