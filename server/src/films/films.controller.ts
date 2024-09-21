import { FastifyRequest, FastifyReply } from 'fastify';
import { FilmsService } from './films.service.js';
import {
  FindAllQueries,
  FindBySearchString,
  FindOneParams,
} from './common/index.js';
import { ResponseCode } from '../common/index.js';

class FilmsController {
  #filmsService: FilmsService;

  constructor() {
    this.#filmsService = new FilmsService();
  }

  findAll = async (
    request: FastifyRequest<{ Querystring: FindAllQueries }>,
    reply: FastifyReply,
  ) => {
    const data = await this.#filmsService.getFilteredFilms(request.query);

    return reply.code(ResponseCode.OK).send(data);
  };

  findOne = async (
    request: FastifyRequest<{ Params: FindOneParams }>,
    reply: FastifyReply,
  ) => {
    const data = await this.#filmsService.getOneFilm(request.params.id);

    if (!data) {
      return reply
        .code(ResponseCode.NOT_FOUND)
        .send({ error: `Film with the ${request.params.id} not found` });
    }

    return reply.code(ResponseCode.OK).send(data);
  };

  findAnniversaries = async (_: FastifyRequest, reply: FastifyReply) => {
    const data = await this.#filmsService.getAnniversaries();

    return reply.code(ResponseCode.OK).send(data);
  };

  findRandomFilms = async (_: FastifyRequest, reply: FastifyReply) => {
    const data = await this.#filmsService.getRandomFilms();

    return reply.code(ResponseCode.OK).send(data);
  };

  findFilmsBySearchString = async (
    request: FastifyRequest<{ Querystring: FindBySearchString }>,
    reply: FastifyReply,
  ) => {
    const { q } = request.query;

    const data = await this.#filmsService.searchFilm(q);

    return reply.code(ResponseCode.OK).send(data);
  };
}

export { FilmsController };
