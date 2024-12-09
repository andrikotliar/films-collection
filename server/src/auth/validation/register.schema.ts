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
        pattern: `^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$`,
        errorMessage: {
          pattern:
            'Password should be at least 8 characters long and contain letters in upper- and lowercase, numbers, and special symbols.',
        },
      },
    },
    required: ['username', 'password'],
    additionalProperties: false,
  },
};

export { registerSchema };
