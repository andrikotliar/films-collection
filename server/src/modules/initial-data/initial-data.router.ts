import { createRouter } from 'src/common';

export const createInitialDataRouter = createRouter((app, defineRoute) => [
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
