import type { Router } from '~/shared/helpers/create-router.js';

export type AnyClass = new (...args: any[]) => any;

export type ApiModuleService<TName extends string = string> = {
  name: TName;
  service: AnyClass;
};

export type ApiModule<TServices extends Record<string, AnyClass>> = {
  services: TServices;
  router?: Router;
};

export const createApiModule = <const TServices extends Record<string, AnyClass>>(
  module: ApiModule<TServices>,
) => module;
