import { contracts } from '@hobbies-collection/contracts';
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
  update: {
    preHandler: [validateAuth],
    async handler({ request, app }) {
      const user = getRequestUser(request);

      const data = await app.resolve('usersService').update(user.id, request.body);

      return {
        data,
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
