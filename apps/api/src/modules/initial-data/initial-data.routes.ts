import { defineRoute, useRoutes } from '~/common';
import { initialData } from '~/modules/initial-data/initial-data.module';

export const initialDataRoutes = useRoutes('initial-data', [
  defineRoute({
    method: 'GET',
    url: '/',
    handler: async () => {
      const data = await initialData.getOptions();

      return data;
    },
  }),
]);
