import type { Route } from 'src/common/types';

export const useRoutes = (prefix: string, routes: Array<Route>) => {
  return {
    prefix,
    routes,
  };
};
