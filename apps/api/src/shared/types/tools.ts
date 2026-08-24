import type { JWT } from '@fastify/jwt';
import type { Database } from '~/plugins/database.plugin.js';

export type Tools = {
  Database: Database;
  Jwt: JWT;
};
