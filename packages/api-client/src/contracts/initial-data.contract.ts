import { InitialDataResponseSchema } from '@films-collection/shared';
import { defineContracts } from '~/helpers';

export const initialDataContract = defineContracts('initial-data', {
  get: {
    method: 'GET',
    url: '',
    schema: {
      response: InitialDataResponseSchema,
    },
  },
});
