import type { FileRoutesByTo } from '~/routeTree.gen';
import type { Colors } from '~/shared/configs/css-colors';

export type MenuConfigItem = {
  id: string;
  title: string;
  shortTitle?: string;
  icon: React.ReactNode;
  color?: Colors;
  route: keyof FileRoutesByTo;
  search?: Record<string, any>;
};
