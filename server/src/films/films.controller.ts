import { FastifyRequest, FastifyReply } from 'fastify';
import { FilmsService } from './film.service.js';
import { FindAllQueries } from './types.js';

class FilmsController {
  private filmsService: FilmsService;

  constructor() {
    this.filmsService = new FilmsService();
  }

  findAll = async (
    request: FastifyRequest<{ Querystring: FindAllQueries }>,
    reply: FastifyReply,
  ) => {
    const films = await this.filmsService.getFilteredFilms(request.query);

    return reply.code(200).send(films);
  };
}

export { FilmsController };
