import { defineRoute, createRouter, validateAuth } from '~/shared';
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

export default createRouter([
  defineRoute({
    method: 'GET',
    url: '/',
    schema: {
      response: AwardsListResponseSchema,
    },
    handler: async ({ app }) => {
      const data = await app.container.resolve('awardsService').getBaseDataList();

      return { data };
    },
  }),

  defineRoute({
    method: 'POST',
    url: '/',
    schema: {
      body: CreateAwardInputSchema,
      response: AwardResponseSchema,
    },
    preHandler: [validateAuth],
    handler: async ({ request, app }) => {
      const data = await app.container.resolve('awardsService').createAward(request.body);

      return { data, status: 'CREATED' };
    },
  }),

  defineRoute({
    method: 'POST',
    url: '/:id/nominations',
    schema: {
      body: NominationInputSchema,
      params: IdParamSchema,
      response: NominationResponseSchema,
    },
    preHandler: [validateAuth],
    handler: async ({ request, app }) => {
      const data = await app.container
        .resolve('awardsService')
        .createNomination(request.params.id, request.body);

      return { data, status: 'CREATED' };
    },
  }),

  defineRoute({
    method: 'GET',
    url: '/:id/nominations',
    schema: {
      params: NullableIdParamSchema,
      response: buildListOptionSchema(
        z.number(),
        z.object({
          shouldIncludeActor: z.boolean(),
        }),
      ),
    },
    async handler({ request, app }) {
      if (!request.params.id) {
        return { data: [] };
      }

      const data = await app.container
        .resolve('awardsService')
        .getNominationsListOptions(request.params.id);

      return { data };
    },
  }),

  defineRoute({
    method: 'GET',
    url: '/:id',
    schema: {
      params: IdParamSchema,
      response: AwardWithNominationsResponseSchema,
    },
    async handler({ request, app }) {
      const data = await app.container.resolve('awardsService').getAwardById(request.params.id, {
        includeNominations: true,
      });

      return { data };
    },
  }),

  defineRoute({
    method: 'PATCH',
    url: '/:id',
    schema: {
      params: IdParamSchema,
      body: CreateAwardInputSchema,
      response: AwardResponseSchema,
    },
    preHandler: [validateAuth],
    handler: async ({ request, app }) => {
      const data = await app.container
        .resolve('awardsService')
        .updateAward(request.params.id, request.body);

      return { data };
    },
  }),

  defineRoute({
    method: 'DELETE',
    url: '/:id',
    schema: {
      params: IdParamSchema,
      response: IdParamSchema,
    },
    preHandler: [validateAuth],
    handler: async ({ request, app }) => {
      const data = await app.container.resolve('awardsService').deleteAward(request.params.id);

      return {
        data: {
          id: data.id,
        },
      };
    },
  }),
]);
