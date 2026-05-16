import { contracts } from '@films-collection/api-client';
import { createRouter } from '~/shared/index.js';

export const initialDataRouter = createRouter(contracts.initialDataContract, {
  get: {
    handler: async ({ app }) => {
      const data = await app.container.resolve('initialDataService').getOptions();

      return { data };
    },
  },
});
