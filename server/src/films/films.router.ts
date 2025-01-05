import { FastifyInstance } from 'fastify';
import { FilmsController } from './films.controller';
import { filmsSchema, searchSchema, adminFilmsListSchema } from './validation';
import { FilmsService } from './films.service';
import { FilmsModel } from './films.model';
import { ActorsService } from 'src/actors/actors.service';
import { ActorModel } from 'src/actors/actors.model';
import { ChaptersService } from 'src/chapters/chapters.service';
import { ChaptersModel } from 'src/chapters/chapters.model';
import { AwardsService } from 'src/awards/awards.service';
import { AwardModel } from 'src/awards/awards.model';
import { CollectionsService } from 'src/collections/collections.service';
import { CollectionModel } from 'src/collections/collections.model';

export const registerFilmsRouter = (app: FastifyInstance) => {
  const actorsService = new ActorsService(ActorModel);
  const chaptersService = new ChaptersService(ChaptersModel);
  const awardsService = new AwardsService(AwardModel);
  const collectionsService = new CollectionsService(CollectionModel);

  const filmsService = new FilmsService({
    filmsModel: FilmsModel,
    actorsService,
    chaptersService,
    awardsService,
    collectionsService,
  });

  const filmsController = new FilmsController(filmsService);

  app.route({
    method: 'GET',
    url: '/films',
    handler: filmsController.findAll.bind(filmsController),
    schema: filmsSchema,
  });

  app.route({
    method: 'GET',
    url: '/films/anniversaries',
    handler: filmsController.findAnniversaries.bind(filmsController),
  });

  app.route({
    method: 'GET',
    url: '/films/random',
    handler: filmsController.findRandomFilms.bind(filmsController),
  });

  app.route({
    method: 'GET',
    url: '/films/search',
    handler: filmsController.findFilmsBySearchString.bind(filmsController),
    schema: searchSchema,
  });

  app.route({
    method: 'GET',
    url: '/films/admin/list',
    preHandler: [app.authenticate],
    handler: filmsController.getAdminFilmsList.bind(filmsController),
    schema: adminFilmsListSchema,
  });

  app.route({
    method: 'GET',
    url: '/films/:id',
    handler: filmsController.findOne.bind(filmsController),
  });

  app.route({
    method: 'DELETE',
    url: '/films/admin/:id',
    preHandler: [app.authenticate],
    handler: filmsController.deleteFilm.bind(filmsController),
  });

  app.route({
    method: 'PATCH',
    url: '/films/admin/:id',
    preHandler: [app.authenticate],
    handler: filmsController.updateFilm.bind(filmsController),
  });
};
