import { FastifySchema } from 'fastify';

export const collectionEventsCreateSchema: FastifySchema = {
  body: {
    type: 'object',
    properties: {
      title: {
        type: 'string',
      },
      image: {
        type: 'string',
      },
      collectionId: {
        type: 'number',
      },
      startDate: {
        type: 'object',
        properties: {
          month: {
            type: 'number',
          },
          date: {
            type: 'number',
          },
        },
        required: ['month', 'date'],
      },
      endDate: {
        type: 'object',
        properties: {
          month: {
            type: 'number',
          },
          date: {
            type: 'number',
          },
        },
        required: ['month', 'date'],
      },
    },
    required: ['title', 'image', 'collectionId', 'startDate', 'endDate'],
    additionalProperties: false,
  },
};
