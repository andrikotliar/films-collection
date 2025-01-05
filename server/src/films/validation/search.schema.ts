import { FastifySchema } from 'fastify';

export const searchSchema: FastifySchema = {
  querystring: {
    type: 'object',
    properties: {
      q: {
        type: 'string',
      },
    },
    required: ['q'],
    additionalProperties: false,
  },
};
