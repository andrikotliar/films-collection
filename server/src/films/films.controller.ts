import { FastifyRequest, FastifyReply } from 'fastify';
import { FilmsService } from './films.service';
import {
  DeleteFilmRequest,
  FindAllRequest,
  FindOneRequest,
  GetAdminFilmsListRequest,
  SearchRequest,
  UpdateFilmRequest,
} from './types';
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

  async findRandomFilms(_: FastifyRequest, reply: FastifyReply) {
    const data = await this.filmsService.getRandomFilms();

    return reply.code(ResponseCode.OK).send(data);
  }

  async findFilmsBySearchString(request: SearchRequest, reply: FastifyReply) {
    const { q } = request.query;

    const data = await this.filmsService.searchFilm(q);

    return reply.code(ResponseCode.OK).send(data);
  }

  async getAdminFilmsList(
    request: GetAdminFilmsListRequest,
    reply: FastifyReply,
  ) {
    const data = await this.filmsService.getAdminFilmsList(request.query);

    return reply.code(ResponseCode.OK).send(data);
  }

  async deleteFilm(request: DeleteFilmRequest, reply: FastifyReply) {
    const result = await this.filmsService.deleteFilm(request.params.id);

    return reply.code(ResponseCode.OK).send(result);
  }

  async updateFilm(request: UpdateFilmRequest, reply: FastifyReply) {
    const result = await this.filmsService.updateFilm(
      request.params.id,
      request.body,
    );

    return reply.code(ResponseCode.OK).send(result);
  }
}
