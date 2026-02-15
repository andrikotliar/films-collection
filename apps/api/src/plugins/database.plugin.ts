import type { FastifyInstance } from 'fastify';
import { drizzle } from 'drizzle-orm/node-postgres';
import fastifyPlugin from 'fastify-plugin';

const database = drizzle(process.env.DATABASE_URL!);

const databaseDecorator = async (app: FastifyInstance) => {
  app.decorate('db', database);
};

export const DatabasePlugin = fastifyPlugin(databaseDecorator);
export type Database = typeof database;
