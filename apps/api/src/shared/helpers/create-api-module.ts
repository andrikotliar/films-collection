import type { Router } from '~/shared/helpers/create-router.js';

export type AnyClass = abstract new (...args: any[]) => any;

export type ApiModule<TServices extends Record<string, AnyClass>> = {
  services: TServices;
  router?: Router;
};

export const createApiModule = <const TServices extends Record<string, AnyClass>>(
  module: ApiModule<TServices>,
) => module;
