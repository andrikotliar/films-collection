import { FastifySchema } from 'fastify';

const loginSchema: FastifySchema = {
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

export { loginSchema };
