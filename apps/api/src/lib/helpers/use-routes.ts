import type { Route } from '~/lib/types';

export const useRoutes = (prefix: string, routes: Array<Route>) => {
  return {
    prefix,
    routes,
  };
};
