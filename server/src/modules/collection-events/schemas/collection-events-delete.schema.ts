import { FastifySchema } from 'fastify';

export const collectionEventsDeleteSchema: FastifySchema = {
  params: {
    type: 'object',
    properties: {
      id: {
        type: 'number',
      },
    },
    required: ['id'],
  },
};
