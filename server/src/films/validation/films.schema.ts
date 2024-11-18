import { FastifySchema } from 'fastify';

const filmsSchema: FastifySchema = {
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
        type: 'string',
      },
      style: {
        type: 'string',
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
      collection: {
        type: 'string',
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
      personName: {
        type: 'string',
      },
      personRole: {
        type: 'string',
      },
      actorId: {
        type: 'string',
      },
      awards: {
        type: 'array',
        items: {
          type: 'string',
        },
      },
      boxOffice: {
        type: 'number',
      },
      budget: {
        type: 'number',
      },
    },
    required: ['limit', 'skip'],
    additionalProperties: false,
  },
};

export { filmsSchema };
