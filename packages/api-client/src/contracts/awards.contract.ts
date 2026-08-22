import {
  AwardResponseSchema,
  AwardsListResponseSchema,
  AwardWithNominationsResponseSchema,
  buildListOptionSchema,
  CommonListQuerySchema,
  CreateAwardInputSchema,
  IdParamSchema,
  NominationInputSchema,
  NominationResponseSchema,
  NullableIdParamSchema,
} from '@films-collection/shared';
import { z } from 'zod';
import { createContract } from '../helpers/index.js';

export const awardsContract = {
  getList: createContract({
    method: 'GET',
    url: '',
    schema: {
      querystring: CommonListQuerySchema,
      response: AwardsListResponseSchema,
    },
  }),
  create: createContract({
    method: 'POST',
    url: '',
    schema: {
      body: CreateAwardInputSchema,
      response: AwardResponseSchema,
    },
  }),
  createNomination: createContract({
    method: 'POST',
    url: ':id/nominations',
    schema: {
      params: IdParamSchema,
      body: NominationInputSchema,
      response: NominationResponseSchema,
    },
  }),
  getNominations: createContract({
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
  }),
  getById: createContract({
    method: 'GET',
    url: ':id',
    schema: {
      params: IdParamSchema,
      response: AwardWithNominationsResponseSchema,
    },
  }),
  update: createContract({
    method: 'PATCH',
    url: ':id',
    schema: {
      params: IdParamSchema,
      body: CreateAwardInputSchema,
      response: AwardResponseSchema,
    },
  }),
  delete: createContract({
    method: 'DELETE',
    url: ':id',
    schema: {
      params: IdParamSchema,
      response: IdParamSchema,
    },
  }),
};
