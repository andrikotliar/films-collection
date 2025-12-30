import type { FileRoutesByTo } from '~/routeTree.gen';
import type { ReactNode } from 'react';

export type MenuConfigItem = {
  id: string;
  route: keyof FileRoutesByTo;
  title: string;
  icon: ReactNode;
};
