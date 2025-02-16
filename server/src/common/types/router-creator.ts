import { FastifyInstance } from 'fastify';

export type RouterCreator<T> = (
  controller: T,
) => (fastify: FastifyInstance) => Promise<void>;
