import { FastifySchema } from 'fastify';

export const loginSchema: FastifySchema = {
  body: {
    type: 'object',
    properties: {
      username: {
        type: 'string',
      },
      password: {
        type: 'string',
      },
    },
    required: ['username', 'password'],
    additionalProperties: false,
  },
};
