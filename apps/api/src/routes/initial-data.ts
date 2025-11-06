import { defineRoute, useRoutes } from '~/lib';

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
