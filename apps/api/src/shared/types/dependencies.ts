import type { JWT } from '@fastify/jwt';
import type { Database } from '~/plugins/index.js';
import type { services } from '~/modules/index.js';

export type ServicesMap = typeof services;
export type ServiceKeys = keyof ServicesMap;
export type ServiceInstances = {
  [K in ServiceKeys]: InstanceType<ServicesMap[K]>;
};

export type ExtendedServiceInstances = ServiceInstances & {
  db: Database;
  jwtService: JWT;
};

export type ExtendedServiceKeys = keyof ExtendedServiceInstances;

export type Deps<Keys extends ExtendedServiceKeys> = Pick<ExtendedServiceInstances, Keys>;
