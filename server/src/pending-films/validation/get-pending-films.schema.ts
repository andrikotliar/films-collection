import { FastifySchema } from 'fastify';

export const getPendingFilmsSchema: FastifySchema = {
  querystring: {
    type: 'object',
    properties: {
      q: {
        type: 'string',
      },
      priority: {
        type: 'number',
      },
      skip: {
        type: 'number',
      },
      sortingField: {
        type: 'string',
      },
      sortingDirection: {
        type: 'string',
        enum: ['asc', 'desc'],
      },
    },
    additionalProperties: false,
  },
};
