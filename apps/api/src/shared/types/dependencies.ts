import type { ApiServices } from '~/modules/app.module.js';
import type { Tools } from '~/shared/types/tools.js';

export type ServiceKeys = keyof ApiServices;

export type ServicesMap = {
  [K in ServiceKeys]: ApiServices[K];
};

export type ServiceInstances = {
  [K in ServiceKeys]: InstanceType<ApiServices[K]>;
};

export type ExtendedServiceInstances = ServiceInstances & Tools;

export type ExtendedServiceKeys = keyof ExtendedServiceInstances;
