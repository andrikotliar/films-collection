import { defineRoute, useRoutes } from '~/common';

export const initialDataRoutes = useRoutes('initial-data', [
  defineRoute({
    method: 'GET',
    url: '/',
    handler: async ({ app }) => {
      const data = await app.container.resolve('initialDataService').getOptions();

      return data;
    },
  }),
]);
