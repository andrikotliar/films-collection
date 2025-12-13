import { defineRoute, createRouter } from '~/shared';

export default createRouter([
  defineRoute({
    method: 'GET',
    url: '/',
    handler: async ({ app }) => {
      const data = await app.container.resolve('initialDataService').getOptions();

      return { data };
    },
  }),
]);
