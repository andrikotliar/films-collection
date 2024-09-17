import { FastifyRequest, FastifyReply } from 'fastify';
import { FilmsService } from './films.service';
import { FindAllQueries, FindOneParams } from './common';
import { ResponseCode } from '../common';

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
}

export { FilmsController };
