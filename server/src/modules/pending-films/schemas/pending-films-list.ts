import { FastifySchema } from 'fastify';

export const pendingFilmsGetListSchema: FastifySchema = {
  querystring: {
    type: 'object',
    properties: {
      q: {
        type: 'string',
      },
      priorities: {
        type: 'array',
        items: {
          type: 'number',
        },
      },
      skip: {
        type: 'number',
      },
      orderKey: {
        type: 'string',
      },
      order: {
        type: 'string',
        enum: ['asc', 'desc'],
      },
    },
    additionalProperties: false,
  },
};
