import type { FileRoutesByTo } from '~/routeTree.gen';

export type NavLink = {
  id: string;
  title: string;
  path: keyof FileRoutesByTo;
  icon?: React.ReactNode;
};
