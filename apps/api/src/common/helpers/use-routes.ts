import type { Route } from '~/common/types';

export const useRoutes = (prefix: string, routes: Array<Route>) => {
  return {
    prefix,
    routes,
  };
};
