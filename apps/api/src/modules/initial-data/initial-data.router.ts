import { initialDataContract } from '@films-collection/api-client';
import { createRouter } from '~/shared';

export const initialDataRouter = createRouter(initialDataContract, {
  get: {
    handler: async ({ app }) => {
      const data = await app.container.resolve('initialDataService').getOptions();

      return { data };
    },
  },
});
