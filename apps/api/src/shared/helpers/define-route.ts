import type z from 'zod';
import type { Route, RouteSchema } from '~/shared/types';

export const defineRoute = <S extends RouteSchema = { response: z.ZodType }>(route: Route<S>) =>
  route;
