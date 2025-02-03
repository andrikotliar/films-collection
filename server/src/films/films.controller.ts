import { FastifyRequest, FastifyReply } from 'fastify';
import { FilmsService } from './films.service';
import { FindAllRequest, FindOneRequest, SearchRequest } from './types';
import { sendErrorResponse, ResponseCode, ErrorCode } from '../common';

export class FilmsController {
  filmsService: FilmsService;

  constructor(filmsService: FilmsService) {
    this.filmsService = filmsService;
  }

  async findAll(request: FindAllRequest, reply: FastifyReply) {
    const data = await this.filmsService.getFilteredFilms(request.query);

    return reply.code(ResponseCode.OK).send(data);
  }

  async findOne(request: FindOneRequest, reply: FastifyReply) {
    const data = await this.filmsService.getOneFilm(request.params.id);

    if (!data) {
      return sendErrorResponse(reply, {
        statusCode: ResponseCode.NOT_FOUND,
        message: `Film with the ${request.params.id} not found`,
        code: ErrorCode.NOT_FOUND,
      });
    }

    return reply.code(ResponseCode.OK).send(data);
  }

  async findAnniversaries(_: FastifyRequest, reply: FastifyReply) {
    const data = await this.filmsService.getAnniversaries();

    return reply.code(ResponseCode.OK).send(data);
  }

  async findFilmsBySearchString(request: SearchRequest, reply: FastifyReply) {
    const { q } = request.query;

    const data = await this.filmsService.searchFilm(q);

    return reply.code(ResponseCode.OK).send(data);
  }
}
