import { FastifySchema } from 'fastify';

const searchSchema: FastifySchema = {
  querystring: {
    type: 'object',
    properties: {
      q: {
        type: 'string',
      },
    },
    required: ['q'],
  },
};

export { searchSchema };
