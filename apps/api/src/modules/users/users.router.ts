import { contracts } from '@films-collection/api-client';
import { createRouter, getRequestUser, validateAuth } from '~/shared/index.js';

export const usersRouter = createRouter(contracts.usersContracts, {
  getSessions: {
    preHandler: [validateAuth],
    async handler({ request, app }) {
      const user = getRequestUser(request);
      const data = await app.container.resolve('usersService').getUserSessions(user);

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
      const user = getRequestUser(request);

      const data = await app.container
        .resolve('usersService')
        .updatePassword(user.id, request.body);

      return {
        data: { id: data.userId },
      };
    },
  },
});
