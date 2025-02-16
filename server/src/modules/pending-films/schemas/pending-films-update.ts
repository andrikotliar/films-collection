import { FastifySchema } from 'fastify';

export const pendingFilmsUpdateSchema: FastifySchema = {
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
