import { FastifyReply } from 'fastify';
import { FindAllRequest, FindOneRequest, SearchRequest } from './types';
import { sendErrorResponse, ResponseCode } from '../../common';
import { FilmsService } from './films.service';

export class FilmsController {
  constructor(private filmsService: FilmsService) {}

  async findAll(request: FindAllRequest, reply: FastifyReply) {
    const data = await this.filmsService.getFilteredFilms(request.query);

    return reply.code(ResponseCode.OK).send(data);
  }

  async findOne(request: FindOneRequest, reply: FastifyReply) {
    const data = await this.filmsService.getFilmDetails(request.params.id);

    if (!data) {
      return sendErrorResponse(reply, {
        status: 'NOT_FOUND',
        code: 'NOT_FOUND',
        message: `Film with the ${request.params.id} not found`,
      });
    }

    return reply.code(ResponseCode.OK).send(data);
  }

  async findFilmsBySearchString(request: SearchRequest, reply: FastifyReply) {
    const { q } = request.query;

    const data = await this.filmsService.searchFilm(q);

    return reply.code(ResponseCode.OK).send(data);
  }
}
