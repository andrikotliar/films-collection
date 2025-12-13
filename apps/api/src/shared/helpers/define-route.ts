import type { Route, RouteSchema } from '~/shared/types';

export const defineRoute = <S extends Partial<RouteSchema> = {}>(route: Route<S>) => route;
