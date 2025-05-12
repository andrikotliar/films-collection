import { router } from 'src/common';

export const InitialDataController = router((app, defineRoute) => [
  defineRoute({
    method: 'GET',
    url: '/',
    handler: async () => {
      const data = await app.initialDataService.getOptions();

      return {
        status: 'OK',
        data,
      };
    },
  }),
]);
