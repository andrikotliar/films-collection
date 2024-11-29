import { FileRoutesByTo } from '@/routeTree.gen';
import { ReactNode } from 'react';

type MenuConfigItem = {
  route: keyof FileRoutesByTo;
  title: string;
  icon: ReactNode;
};

export type { MenuConfigItem };
