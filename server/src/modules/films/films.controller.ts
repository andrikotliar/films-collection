import { FastifyReply, FastifyRequest } from 'fastify';
import { sendErrorResponse, ResponseCode } from '../../common';
import { FilmsService } from './films.service';
import {
  FilmsAdminQuery,
  FilmsGetParams,
  FilmsQuery,
  FilmsSearchQuery,
} from 'src/modules/films/schemas';

export class FilmsController {
  filmsService!: FilmsService;

  async findAll(
    request: FastifyRequest<{ Querystring: FilmsQuery }>,
    reply: FastifyReply,
  ) {
    const data = await this.filmsService.getFilteredFilms(request.query);

    return reply.code(ResponseCode.OK).send(data);
  }

  async findOne(
    request: FastifyRequest<{ Params: FilmsGetParams }>,
    reply: FastifyReply,
  ) {
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

  async findFilmsBySearchString(
    request: FastifyRequest<{ Querystring: FilmsSearchQuery }>,
    reply: FastifyReply,
  ) {
    const { q } = request.query;

    const data = await this.filmsService.searchFilm(q);

    return reply.code(ResponseCode.OK).send(data);
  }

  async getAdminList(
    request: FastifyRequest<{ Querystring: FilmsAdminQuery }>,
    reply: FastifyReply,
  ) {
    const data = await this.filmsService.getAdminList(request.query);

    return reply.code(ResponseCode.OK).send(data);
  }
}
