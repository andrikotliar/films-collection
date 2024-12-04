import { FastifySchema } from 'fastify';

const registerSchema: FastifySchema = {
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

export { registerSchema };
