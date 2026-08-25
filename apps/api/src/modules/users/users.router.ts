import { contracts } from '@films-collection/api-client';
import { createRouter } from '~/shared/helpers/create-router.js';
import { getRequestUser } from '~/shared/helpers/get-request-user.js';
import { validateAuth } from '~/shared/pre-handlers/validate-auth.js';

export const usersRouter = createRouter(contracts.users, {
  getSessions: {
    preHandler: [validateAuth],
    async handler({ request, app }) {
      const user = getRequestUser(request);
      const data = await app.resolve('usersService').getUserSessions(user);

      return { data };
    },
  },
  terminateSession: {
    preHandler: [validateAuth],
    async handler({ request, app }) {
      await app.resolve('usersService').terminateSession(request.params.id);

      return {
        data: { id: request.params.id },
      };
    },
  },
  updatePassword: {
    preHandler: [validateAuth],
    async handler({ request, app }) {
      const user = getRequestUser(request);

      const data = await app.resolve('usersService').updatePassword(user.id, request.body);

      return {
        data: { id: data.userId },
      };
    },
  },
  updateTranslationPreferences: {
    preHandler: [validateAuth],
    async handler({ request, app }) {
      const user = getRequestUser(request);

      const data = await app
        .resolve('usersService')
        .updateTranslationPreferences(user.id, request.body);

      return {
        data: { id: data.userId },
      };
    },
  },
  getUser: {
    preHandler: [validateAuth],
    async handler({ request, app }) {
      const user = getRequestUser(request);

      const data = await app.resolve('usersService').getDisplayData(user.id);

      return {
        data,
      };
    },
  },
});
