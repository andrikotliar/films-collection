import { FastifySchema } from 'fastify';

export const pendingFilmsUpdateSchema: FastifySchema = {
  params: {
    type: 'object',
    properties: {
      id: {
        type: 'number',
      },
    },
    required: ['id'],
  },
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
