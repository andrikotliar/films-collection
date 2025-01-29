import ajvErrors from 'ajv-errors';
import { FastifyServerOptions } from 'fastify';

export const validatorOptions: FastifyServerOptions['ajv'] = {
  customOptions: {
    removeAdditional: 'all',
    allErrors: true,
  },
  plugins: [ajvErrors],
};
