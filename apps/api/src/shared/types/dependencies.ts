import type { JWT } from '@fastify/jwt';
import type { PrismaClient } from '@prisma/client';
import type { services } from '~/services';

export type ServicesMap = typeof services;
export type ServiceKeys = keyof ServicesMap;
export type ServiceInstances = {
  [K in ServiceKeys]: InstanceType<ServicesMap[K]>;
};

export type ExtendedServiceInstances = ServiceInstances & {
  databaseService: PrismaClient;
  jwtService: JWT;
};

export type ExtendedServiceKeys = keyof ExtendedServiceInstances;

export type Deps<Keys extends ExtendedServiceKeys> = Pick<ExtendedServiceInstances, Keys>;
