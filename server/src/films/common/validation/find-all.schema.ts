import { FastifySchema } from 'fastify';

const findAllSchema: FastifySchema = {
  querystring: {
    type: 'object',
    properties: {
      limit: {
        type: 'number',
      },
      skip: {
        type: 'number',
      },
      type: {
        type: 'array',
        items: {
          enum: ['Film', 'Animation', 'Series'],
        },
      },
      genre: {
        type: 'array',
        items: {
          type: 'string',
        },
      },
      studio: {
        type: 'array',
        items: {
          type: 'string',
        },
      },
      country: {
        type: 'array',
        items: {
          type: 'string',
        },
      },
      collections: {
        type: 'array',
        items: {
          type: 'string',
        },
      },
      startDate: {
        type: 'string',
      },
      endDate: {
        type: 'string',
      },
    },
    required: ['limit', 'skip'],
    additionalProperties: false,
  },
};

export { findAllSchema };
