import type { Route, RouteSchema } from '~/shared/types';

export const defineRoute = <S extends Partial<RouteSchema> = {}, R = unknown>(
  route: Route<S, R>,
) => {
  return route;
};
