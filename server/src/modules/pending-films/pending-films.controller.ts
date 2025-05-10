import { FastifyReply, FastifyRequest } from 'fastify';
import { PendingFilmsService } from './pending-films.service';
import { NotFoundException, ResponseCode } from 'src/common';
import {
  FindPendingFilmParams,
  PendingFilmsCreatePayload,
  PendingFilmsDeleteParams,
  PendingFilmsQuery,
  PendingFilmsUpdateParams,
  PendingFilmsUpdatePayload,
} from './schemas';

export class PendingFilmsController {
  pendingFilmsService!: PendingFilmsService;

  async getList(
    request: FastifyRequest<{ Querystring: PendingFilmsQuery }>,
    reply: FastifyReply,
  ) {
    const list = await this.pendingFilmsService.getList(request.query);

    return reply.code(ResponseCode.OK).send(list);
  }

  async createPendingFilm(
    request: FastifyRequest<{ Body: PendingFilmsCreatePayload }>,
    reply: FastifyReply,
  ): Promise<never> {
    const createdPendingFilm = await this.pendingFilmsService.createPendingFilm(
      request.body,
    );

    return reply.code(ResponseCode.CREATED).send(createdPendingFilm);
  }

  async deletePendingFilm(
    request: FastifyRequest<{ Params: PendingFilmsDeleteParams }>,
    reply: FastifyReply,
  ) {
    const result = await this.pendingFilmsService.deletePendingFilm(
      request.params.id,
    );
    return reply.code(ResponseCode.OK).send(result);
  }

  async updatePendingFilm(
    request: FastifyRequest<{
      Params: PendingFilmsUpdateParams;
      Body: PendingFilmsUpdatePayload;
    }>,
    reply: FastifyReply,
  ) {
    const result = await this.pendingFilmsService.updatePendingFilm(
      request.params.id,
      request.body,
    );

    return reply.code(ResponseCode.OK).send(result);
  }

  async findPendingFilm(
    request: FastifyRequest<{
      Params: FindPendingFilmParams;
    }>,
    reply: FastifyReply,
  ) {
    const result = await this.pendingFilmsService.getPendingFilmById(
      request.params.id,
    );

    if (!result) {
      throw new NotFoundException({
        message: `Pending film ${request.params.id} not found`,
      });
    }

    return reply.code(ResponseCode.OK).send(result);
  }
}
