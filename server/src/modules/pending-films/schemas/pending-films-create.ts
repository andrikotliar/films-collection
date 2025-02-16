import { FastifySchema } from 'fastify';

export const pendingFilmsCreateSchema: FastifySchema = {
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
    required: ['title'],
    additionalProperties: false,
  },
};
