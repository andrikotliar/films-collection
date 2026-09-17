import {
  HobbyMutationSchema,
  HobbiesListResponseSchema,
  HobbyResponseSchema,
  IdParamSchema,
  HobbyByIdResponseSchema,
  HobbyByIdQueriesSchema,
  HobbyItemParamsSchema,
  HobbyItemResponseSchema,
  HobbyItemInputSchema,
  HobbyItemsByCollectionIdResponseSchema,
  HobbyItemUpdateInputSchema,
  HobbyByIdAdminResponseSchema,
  HobbyByTitleParamsSchema,
} from '@films-collection/shared';
import { createContract } from '../helpers/define-contracts.js';

export const hobbiesContract = {
  getHobbiesList: createContract({
    url: '',
    method: 'GET',
    schema: {
      response: HobbiesListResponseSchema,
    },
  }),
  getHobby: createContract({
    url: ':id',
    method: 'GET',
    schema: {
      params: IdParamSchema,
      querystring: HobbyByIdQueriesSchema,
      response: HobbyByIdResponseSchema,
    },
  }),
  createHobby: createContract({
    url: '',
    method: 'POST',
    schema: {
      body: HobbyMutationSchema,
      response: HobbyResponseSchema,
    },
  }),
  updateHobby: createContract({
    url: ':id',
    method: 'PATCH',
    schema: {
      params: IdParamSchema,
      body: HobbyMutationSchema,
      response: HobbyResponseSchema,
    },
  }),
  deleteHobby: createContract({
    url: ':id',
    method: 'DELETE',
    schema: {
      params: IdParamSchema,
      response: IdParamSchema,
    },
  }),
  deleteHobbyItem: createContract({
    url: ':id/item/:itemId',
    method: 'DELETE',
    schema: {
      params: HobbyItemParamsSchema,
      response: IdParamSchema,
    },
  }),
  createHobbyItem: createContract({
    url: ':id/item',
    method: 'POST',
    schema: {
      params: IdParamSchema,
      body: HobbyItemInputSchema,
      response: HobbyItemResponseSchema,
    },
  }),
  getHobbiesByCollection: createContract({
    url: 'collection/:id',
    method: 'GET',
    schema: {
      params: IdParamSchema,
      response: HobbyItemsByCollectionIdResponseSchema,
    },
  }),
  updateHobbyItem: createContract({
    url: ':id/item:/:itemId',
    method: 'PATCH',
    schema: {
      params: HobbyItemParamsSchema,
      body: HobbyItemUpdateInputSchema,
      response: HobbyItemResponseSchema,
    },
  }),
  getHobbyAdmin: createContract({
    url: ':id/admin',
    method: 'GET',
    schema: {
      params: IdParamSchema,
      querystring: HobbyByIdQueriesSchema,
      response: HobbyByIdAdminResponseSchema,
    },
  }),
  getHobbyByTitle: createContract({
    url: '/title/:title',
    method: 'GET',
    schema: {
      params: HobbyByTitleParamsSchema,
      response: HobbyByIdResponseSchema,
    },
  }),
};
