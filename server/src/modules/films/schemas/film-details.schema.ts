import { FastifySchema } from 'fastify';

export const filmDetailsSchema: FastifySchema = {
  params: {
    type: 'object',
    properties: {
      id: {
        type: 'number',
      },
    },
    required: ['id'],
    additionalProperties: false,
  },
};
