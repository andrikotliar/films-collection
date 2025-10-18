import type { Route, RouteSchema } from '~/common/types';

export const defineRoute = <S extends Partial<RouteSchema> = {}, R = unknown>(
  route: Route<S, R>,
) => {
  return route;
};
