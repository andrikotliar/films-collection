import { defineRoute, useRoutes } from 'src/common';
import { initialData } from 'src/modules/initial-data/initial-data.module';

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
