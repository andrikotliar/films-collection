import type { FileRoutesByTo } from '~/routeTree.gen';

export type MenuConfigItem = {
  id: string;
  route: keyof FileRoutesByTo;
  title: string;
  icon: React.ReactNode;
  color?: string;
};
