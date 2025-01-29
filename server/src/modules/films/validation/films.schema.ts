import { TitleStyle, TitleType } from '@prisma/client';
import { FastifySchema } from 'fastify';

export const filmsSchema: FastifySchema = {
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
        enum: Object.values(TitleStyle),
      },
      genreIds: {
        type: 'array',
        items: {
          type: 'number',
        },
      },
      studioIds: {
        type: 'array',
        items: {
          type: 'number',
        },
      },
      countryIds: {
        type: 'array',
        items: {
          type: 'number',
        },
      },
      collectionId: {
        type: 'number',
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
      personId: {
        type: 'number',
      },
      personRoleId: {
        type: 'number',
      },
      actorId: {
        type: 'string',
      },
      awardIds: {
        type: 'array',
        items: {
          type: 'number',
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
