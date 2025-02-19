import { FastifySchema } from 'fastify';

export const pendingFilmsDeleteSchema: FastifySchema = {
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
