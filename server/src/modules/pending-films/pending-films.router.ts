import { RouterCreator } from 'src/common';
import { PendingFilmsController } from 'src/modules/pending-films/pending-films.controller';
import {
  pendingFilmsCreateSchema,
  pendingFilmsDeleteSchema,
  pendingFilmsGetListSchema,
  pendingFilmsUpdateSchema,
} from 'src/modules/pending-films/schemas';

export const createPendingFilmsRouter: RouterCreator<PendingFilmsController> = (
  controller,
) => {
  return async (pendingFilmsModule) => {
    pendingFilmsModule.route({
      method: 'GET',
      url: '/',
      preHandler: [pendingFilmsModule.authenticate],
      schema: pendingFilmsGetListSchema,
      handler: controller.getList.bind(controller),
    });

    pendingFilmsModule.route({
      method: 'POST',
      url: '/',
      preHandler: [pendingFilmsModule.authenticate],
      schema: pendingFilmsCreateSchema,
      handler: controller.createPendingFilm.bind(controller),
    });

    pendingFilmsModule.route({
      method: 'PATCH',
      url: '/:id',
      preHandler: [pendingFilmsModule.authenticate],
      schema: pendingFilmsUpdateSchema,
      handler: controller.updatePendingFilm.bind(controller),
    });

    pendingFilmsModule.route({
      method: 'DELETE',
      url: '/:id',
      preHandler: [pendingFilmsModule.authenticate],
      schema: pendingFilmsDeleteSchema,
      handler: controller.deletePendingFilm.bind(controller),
    });
  };
};
