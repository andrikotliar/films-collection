import { FastifySchema } from 'fastify';

export const collectionEventsUpdateSchema: FastifySchema = {
  params: {
    type: 'object',
    properties: {
      id: {
        type: 'number',
      },
    },
    required: ['id'],
  },
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
  },
};
