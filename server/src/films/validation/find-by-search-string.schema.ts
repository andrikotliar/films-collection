import { FastifySchema } from 'fastify';

const findBySearchStringSchema: FastifySchema = {
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

export { findBySearchStringSchema };
