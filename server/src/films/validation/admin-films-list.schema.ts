import { FastifySchema } from 'fastify';
import { sortingParams } from 'src/common';

export const adminFilmsListSchema: FastifySchema = {
  querystring: {
    type: 'object',
    properties: {
      q: {
        type: 'string',
      },
      skip: {
        type: 'number',
      },
      ...sortingParams,
    },
    additionalProperties: false,
  },
};
