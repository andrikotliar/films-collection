import type { FileRoutesByTo } from '~/routeTree.gen';

type BaseConfig = {
  id: string;
  title: string;
  icon: React.ReactNode;
  color?: string;
};

type LinkConfig = BaseConfig & {
  route: keyof FileRoutesByTo;
  search?: Record<string, any>;
  type: 'link';
};

type ButtonConfig = BaseConfig & {
  action: VoidFunction;
  type: 'button';
};

export type MenuConfigItem = LinkConfig | ButtonConfig;
