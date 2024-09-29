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
      genres: {
        type: 'array',
        items: {
          type: 'string',
        },
      },
      studios: {
        type: 'array',
        items: {
          type: 'string',
        },
      },
      countries: {
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
      duration: {
        type: 'number',
      },
      watchCount: {
        type: 'number',
      },
      rating: {
        type: 'number',
      },
      seasonsTotal: {
        type: 'number',
      },
      episodesTotal: {
        type: 'number',
      },
    },
    required: ['limit', 'skip'],
    additionalProperties: false,
  },
};

export { findAllSchema };
