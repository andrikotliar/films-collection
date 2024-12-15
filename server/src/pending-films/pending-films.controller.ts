import { FastifyReply, FastifyRequest } from 'fastify';
import { PendingFilmsService } from './pending-films.service';
import { ResponseCode } from 'src/common';
import {
  CreatePendingFilmRequest,
  GetPendingFilmRequest,
  IPendingFilmsController,
} from './types';

export class PendingFilmsController implements IPendingFilmsController {
  private pendingFilmsService: PendingFilmsService;

  constructor(pendingFilmsService: PendingFilmsService) {
    this.pendingFilmsService = pendingFilmsService;
  }

  async getList(request: GetPendingFilmRequest, reply: FastifyReply) {
    const list = await this.pendingFilmsService.getList(request.query);

    return reply.code(ResponseCode.OK).send(list);
  }

  async createPendingFilm(
    request: CreatePendingFilmRequest,
    reply: FastifyReply,
  ): Promise<never> {
    const createdPendingFilm = await this.pendingFilmsService.createPendingFilm(
      request.body,
    );

    return reply.code(ResponseCode.CREATED).send(createdPendingFilm);
  }
}
