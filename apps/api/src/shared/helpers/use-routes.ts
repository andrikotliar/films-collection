import type { Route } from '~/shared/types';

export const useRoutes = (prefix: string, routes: Array<Route>) => {
  return {
    prefix,
    routes,
  };
};
