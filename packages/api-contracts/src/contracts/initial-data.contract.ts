import { InitialDataResponseSchema } from '@hobbies-collection/shared';
import { createContract } from '../helpers/index.js';

export const initialDataContract = {
  get: createContract({
    method: 'GET',
    url: '',
    schema: {
      response: InitialDataResponseSchema,
    },
  }),
};
