import { RouterCreator } from 'src/common';
import { FilmsController } from 'src/modules/films/films.controller';
import {
  filmDetailsSchema,
  filmsGetListSchema,
  filmsSearchSchema,
} from 'src/modules/films/schemas';

export const createFilmsRouter: RouterCreator<FilmsController> = (
  controller,
) => {
  return async (filmsModule) => {
    filmsModule.route({
      method: 'GET',
      url: '/',
      handler: controller.findAll.bind(controller),
      schema: filmsGetListSchema,
    });

    filmsModule.route({
      method: 'GET',
      url: '/search',
      handler: controller.findFilmsBySearchString.bind(controller),
      schema: filmsSearchSchema,
    });

    filmsModule.route({
      method: 'GET',
      url: '/:id',
      schema: filmDetailsSchema,
      handler: controller.findOne.bind(controller),
    });
  };
};
