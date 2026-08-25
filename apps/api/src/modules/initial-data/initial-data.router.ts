import { contracts } from '@films-collection/api-client';
import { createRouter } from '~/shared/helpers/create-router.js';

export const initialDataRouter = createRouter(contracts.initialData, {
  get: {
    handler: async ({ app }) => {
      const data = await app.resolve('initialDataService').getOptions();

      return { data };
    },
  },
});
