import { FastifySchema } from 'fastify';

export const updatePendingFilmSchema: FastifySchema = {
  body: {
    type: 'object',
    properties: {
      title: {
        type: 'string',
      },
      priority: {
        type: 'number',
      },
    },
  },
};
