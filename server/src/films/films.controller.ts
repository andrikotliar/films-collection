import { FastifyRequest, FastifyReply } from 'fastify';
import { FilmsService } from './films.service';
import { FindAllQueries } from './common';
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
}

export { FilmsController };
