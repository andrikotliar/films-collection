import { FastifyReply } from 'fastify';
import { PendingFilmsService } from './pending-films.service';
import { ResponseCode } from 'src/common';
import {
  CreatePendingFilmRequest,
  DeletePendingFilmRequest,
  GetPendingFilmRequest,
  UpdatePendingFilmRequest,
} from './types';

export class PendingFilmsController {
  constructor(private pendingFilmsService: PendingFilmsService) {}

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

  async deletePendingFilm(
    request: DeletePendingFilmRequest,
    reply: FastifyReply,
  ) {
    const result = await this.pendingFilmsService.deletePendingFilm(
      request.params.id,
    );
    return reply.code(ResponseCode.OK).send(result);
  }

  async updatePendingFilm(
    request: UpdatePendingFilmRequest,
    reply: FastifyReply,
  ) {
    const result = await this.pendingFilmsService.updatePendingFilm(
      request.params.id,
      request.body,
    );

    return reply.code(ResponseCode.OK).send(result);
  }
}
