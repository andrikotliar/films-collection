import { InitialDataResponseSchema } from '@films-collection/shared';
import { defineRoute, createRouter } from '~/shared';

export default createRouter([
  defineRoute({
    method: 'GET',
    url: '/',
    schema: {
      response: InitialDataResponseSchema,
    },
    handler: async ({ app }) => {
      const data = await app.container.resolve('initialDataService').getOptions();

      return { data };
    },
  }),
]);
