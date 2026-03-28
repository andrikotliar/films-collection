import {
  AwardResponseSchema,
  AwardsListResponseSchema,
  AwardWithNominationsResponseSchema,
  buildListOptionSchema,
  CreateAwardInputSchema,
  IdParamSchema,
  NominationInputSchema,
  NominationResponseSchema,
  NullableIdParamSchema,
} from '@films-collection/shared';
import z from 'zod';
import { defineContracts } from '~/helpers';

export const awardsContract = defineContracts('awards', {
  getList: {
    method: 'GET',
    url: '',
    schema: {
      response: AwardsListResponseSchema,
    },
  },
  create: {
    method: 'POST',
    url: '',
    schema: {
      body: CreateAwardInputSchema,
      response: AwardResponseSchema,
    },
  },
  createNomination: {
    method: 'POST',
    url: ':id/nominations',
    schema: {
      params: IdParamSchema,
      body: NominationInputSchema,
      response: NominationResponseSchema,
    },
  },
  getNominations: {
    method: 'GET',
    url: ':id/nominations',
    schema: {
      params: NullableIdParamSchema,
      response: buildListOptionSchema(
        z.number(),
        z.object({
          shouldIncludeActor: z.boolean(),
        }),
      ),
    },
  },
  getById: {
    method: 'GET',
    url: ':id',
    schema: {
      params: IdParamSchema,
      response: AwardWithNominationsResponseSchema,
    },
  },
  update: {
    method: 'PATCH',
    url: ':id',
    schema: {
      params: IdParamSchema,
      body: CreateAwardInputSchema,
      response: AwardResponseSchema,
    },
  },
  delete: {
    method: 'DELETE',
    url: ':id',
    schema: {
      params: IdParamSchema,
      response: IdParamSchema,
    },
  },
});
