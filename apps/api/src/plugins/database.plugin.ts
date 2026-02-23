import type { FastifyInstance } from 'fastify';
import { drizzle } from 'drizzle-orm/node-postgres';
import fastifyPlugin from 'fastify-plugin';
import * as schema from '~/database/schema';
import * as relations from '~/database/relations';
import 'dotenv/config';

const database = drizzle(process.env.DATABASE_URL!, { schema: { ...schema, ...relations } });

const databaseDecorator = async (app: FastifyInstance) => {
  app.decorate('db', database);
};

export const DatabasePlugin = fastifyPlugin(databaseDecorator);
export type Database = typeof database;
