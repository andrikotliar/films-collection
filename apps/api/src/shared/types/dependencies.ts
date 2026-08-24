import type { JWT } from '@fastify/jwt';
import type { ApiModules } from '~/modules/index.js';
import type { Database } from '~/plugins/index.js';

type UnionKeys<T> = T extends unknown ? keyof T : never;
type UnionValue<T, K extends PropertyKey> = T extends Record<K, infer V> ? V : never;

type Services = ApiModules[number]['services'];

export type ServiceKeys = UnionKeys<Services>;

export type ServicesMap = {
  [K in ServiceKeys]: UnionValue<Services, K>;
};

export type ServiceInstances = {
  [K in ServiceKeys]: InstanceType<UnionValue<Services, K>>;
};

export type ExtendedServiceInstances = ServiceInstances & {
  Database: Database;
  Jwt: JWT;
};

export type ExtendedServiceKeys = keyof ExtendedServiceInstances;

export type Deps<Keys extends ExtendedServiceKeys> = Pick<ExtendedServiceInstances, Keys>;
