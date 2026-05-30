import { contracts } from '@films-collection/api-client';
import {
  NotFoundException,
  createRouter,
  getRequestUser,
  validateAuth,
  validateGetSignature,
} from '~/shared/index.js';

export const filmsRouter = createRouter(contracts.filmsContract, {
  getList: {
    handler: async ({ request, app }) => {
      const data = await app.container.resolve('filmsService').getFilteredFilms(request.query);

      return { data };
    },
  },

  search: {
    handler: async ({ request, app }) => {
      const data = await app.container.resolve('filmsService').searchFilm(request.query.q);

      return { data };
    },
  },

  getOptions: {
    handler: async ({ request, app }) => {
      const data = await app.container.resolve('filmsService').getFilmOptions(request.query);

      return { data };
    },
  },

  getFilmStats: {
    handler: async ({ request, app }) => {
      const data = await app.container.resolve('filmsService').getStats(request.query);

      return { data };
    },
  },

  getAdminList: {
    preHandler: [validateAuth],
    handler: async ({ request, app }) => {
      const data = await app.container.resolve('filmsService').getAdminList(request.query);

      return { data };
    },
  },

  getEditableFilm: {
    preHandler: [validateAuth],
    handler: async ({ request, app }) => {
      const data = await app.container.resolve('filmsService').getEditableFilm(request.params.id);

      return { data };
    },
  },

  export: {
    preHandler: [validateGetSignature],
    handler: async ({ request, app }) => {
      const data = await app.container
        .resolve('filmsService')
        .getCompleteData(request.query as any);

      return { data };
    },
  },

  getById: {
    handler: async ({ request, app }) => {
      const data = await app.container.resolve('filmsService').getFilmDetails(request.params.id);

      if (!data) {
        throw new NotFoundException({
          message: `Film with the ${request.params.id} not found`,
        });
      }

      return { data };
    },
  },

  getTrailers: {
    handler: async ({ request, app }) => {
      const trailers = await app.container
        .resolve('filmsService')
        .getFilmTrailers(request.params.id);

      return { data: { trailers } };
    },
  },

  create: {
    preHandler: [validateAuth],
    handler: async ({ request, app }) => {
      const data = await app.container.resolve('filmsService').createFilm(request.body);

      if (!data) {
        throw new NotFoundException({
          message: 'Create film not found',
        });
      }

      return { data, status: 'CREATED' };
    },
  },

  update: {
    preHandler: [validateAuth],
    handler: async ({ request, app }) => {
      const data = await app.container
        .resolve('filmsService')
        .updateFilm(request.params.id, request.body);

      if (!data) {
        throw new NotFoundException({
          message: `Film ${request.params.id} not found`,
        });
      }

      return { data };
    },
  },

  delete: {
    preHandler: [validateAuth],
    handler: async ({ request, app }) => {
      const data = await app.container.resolve('filmsService').deleteFilm(request.params.id);

      return { data };
    },
  },

  translateDescription: {
    preHandler: [validateAuth],
    handler: async ({ request, app }) => {
      const user = getRequestUser(request);

      const translatedText = await app.container
        .resolve('filmsService')
        .translateDescription(user.id, request.body);

      return { data: { translatedText } };
    },
  },

  createDraft: {
    preHandler: [validateAuth],
    handler: async ({ request, app }) => {
      const data = await app.container
        .resolve('filmsService')
        .createDraft(request.params.filmId, request.body);

      return {
        data,
        status: 'CREATED',
      };
    },
  },

  updateDraft: {
    preHandler: [validateAuth],
    handler: async ({ request, app }) => {
      const data = await app.container
        .resolve('filmsService')
        .updateDraft(request.params.id, request.body);

      return {
        data,
      };
    },
  },

  getFilmDrafts: {
    preHandler: [validateAuth],
    handler: async ({ request, app }) => {
      const data = await app.container.resolve('filmsService').getDrafts(request.params.filmId);

      return { data };
    },
  },

  deleteDraft: {
    preHandler: [validateAuth],
    handler: async ({ request, app }) => {
      await app.container.resolve('filmsService').deleteDraft(request.params.id);

      return { data: { id: request.params.id } };
    },
  },

  getByCollection: {
    preHandler: [validateAuth],
    handler: async ({ request, app }) => {
      const data = await app.container
        .resolve('filmsService')
        .getFilmsByCollection(request.params.id);

      return { data };
    },
  },

  generateDescription: {
    preHandler: [validateAuth],
    handler: async ({ request, app }) => {
      const data = await app.container.resolve('filmsService').generateDescription(request.body);

      return { data: { text: data } };
    },
  },
});
