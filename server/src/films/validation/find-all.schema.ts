import { FastifySchema } from 'fastify';
import { CollectionEnum, TitleType } from '../enums';

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
          enum: Object.values(TitleType),
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
      collection: {
        type: 'string',
        enum: Object.values(CollectionEnum),
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
    },
    required: ['limit', 'skip'],
    additionalProperties: false,
  },
};

export { findAllSchema };
