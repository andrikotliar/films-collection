import { FileRoutesByTo } from '~/routeTree.gen';
import { ReactNode } from 'react';

export type MenuConfigItem = {
  id: string;
  route: keyof FileRoutesByTo;
  title: string;
  icon: ReactNode;
};
