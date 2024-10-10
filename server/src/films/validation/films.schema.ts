import { FastifySchema } from 'fastify';
import { CollectionEnum, StyleType, TitleType } from '../enums';

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
        enum: Object.values(TitleType),
      },
      style: {
        type: 'string',
        enum: Object.values(StyleType),
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

export { filmsSchema };
