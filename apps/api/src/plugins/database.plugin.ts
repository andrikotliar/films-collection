import type { FastifyInstance } from 'fastify';
import { drizzle } from 'drizzle-orm/node-postgres';
import fastifyPlugin from 'fastify-plugin';
import * as schema from '~/database/schema.js';
import * as relations from '~/database/relations.js';
import 'dotenv/config';

export const database = drizzle(process.env.DATABASE_URL!, { schema: { ...schema, ...relations } });

const databaseDecorator = async (app: FastifyInstance) => {
  app.decorate('db', database);
};

export const DatabasePlugin = fastifyPlugin(databaseDecorator);
export type Database = typeof database;
