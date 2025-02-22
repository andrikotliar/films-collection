import { CrewPosition, TitleStyle, TitleType } from '@prisma/client';
import { FastifySchema } from 'fastify';

export const filmsGetListSchema: FastifySchema = {
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
      rating: {
        type: 'number',
      },
      seasonsTotal: {
        type: 'number',
      },
      episodesTotal: {
        type: 'number',
      },
      crewMemberId: {
        type: 'number',
      },
      crewMemberPosition: {
        type: 'string',
        enum: Object.values(CrewPosition),
      },
      actorId: {
        type: 'number',
      },
      awardId: {
        type: 'number',
      },
      boxOffice: {
        type: 'number',
      },
      budget: {
        type: 'number',
      },
      searchAnniversaries: {
        type: 'boolean',
      },
      ids: {
        type: 'array',
        items: {
          type: 'number',
        },
      },
    },
    required: ['limit', 'skip'],
    additionalProperties: false,
  },
};
