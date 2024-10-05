import { FastifyRequest, FastifyReply } from 'fastify';
import { FilmsService } from './films.service';
import {
  FindAllRequest,
  FindOneRequest,
  IFilmsController,
  SearchRequest,
} from './types';
import { getErrorResponse, ResponseCode } from '../common';

class FilmsController implements IFilmsController {
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
      return reply
        .code(ResponseCode.NOT_FOUND)
        .send(
          getErrorResponse(
            ResponseCode.NOT_FOUND,
            `Film with the ${request.params.id} not found`,
          ),
        );
    }

    return reply.code(ResponseCode.OK).send(data);
  }

  async findAnniversaries(_: FastifyRequest, reply: FastifyReply) {
    const data = await this.filmsService.getAnniversaries();

    return reply.code(ResponseCode.OK).send(data);
  }

  async findRandomFilms(_: FastifyRequest, reply: FastifyReply) {
    const data = await this.filmsService.getRandomFilms();

    return reply.code(ResponseCode.OK).send(data);
  }

  async findFilmsBySearchString(request: SearchRequest, reply: FastifyReply) {
    const { q } = request.query;

    const data = await this.filmsService.searchFilm(q);

    return reply.code(ResponseCode.OK).send(data);
  }
}

export { FilmsController };
