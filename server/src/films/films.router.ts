import { FastifyInstance } from 'fastify';
import { FilmsController } from './films.controller';
import { filmsSchema, searchSchema } from './validation';
import { FilmsService } from './films.service';
import { FilmsModel } from './films.model';
import { ActorsService } from 'src/actors/actors.service';
import { ActorModel } from 'src/actors/actors.model';
import { ChaptersService } from 'src/chapters/chapters.service';
import { ChaptersModel } from 'src/chapters/chapters.model';
import { FindAllRequest, FindOneRequest, SearchRequest } from './types';
import { AwardsService } from 'src/awards/awards.service';
import { AwardModel } from 'src/awards/awards.model';

const registerFilmsRouter = (app: FastifyInstance) => {
  const actorsService = new ActorsService(ActorModel);
  const chaptersService = new ChaptersService(ChaptersModel);
  const awardsService = new AwardsService(AwardModel);

  const filmsService = new FilmsService({
    filmsModel: FilmsModel,
    actorsService,
    chaptersService,
    awardsService,
  });

  const filmsController = new FilmsController(filmsService);

  app.route({
    method: 'GET',
    url: '/films',
    handler: (request: FindAllRequest, reply) => {
      return filmsController.findAll(request, reply);
    },
    schema: filmsSchema,
  });

  app.route({
    method: 'GET',
    url: '/films/anniversaries',
    handler: (request, reply) => {
      return filmsController.findAnniversaries(request, reply);
    },
  });

  app.route({
    method: 'GET',
    url: '/films/random',
    handler: (request, reply) => {
      return filmsController.findRandomFilms(request, reply);
    },
  });

  app.route({
    method: 'GET',
    url: '/films/search',
    handler: (request: SearchRequest, reply) => {
      return filmsController.findFilmsBySearchString(request, reply);
    },
    schema: searchSchema,
  });

  app.route({
    method: 'GET',
    url: '/films/:id',
    handler: (request: FindOneRequest, reply) => {
      return filmsController.findOne(request, reply);
    },
  });
};

export { registerFilmsRouter };
