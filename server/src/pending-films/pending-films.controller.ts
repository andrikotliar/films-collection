import { FastifyReply, FastifyRequest } from 'fastify';
import { PendingFilmsService } from './pending-films.service';
import { ResponseCode } from 'src/common';

export class PendingFilmsController {
  private pendingFilmsService: PendingFilmsService;

  constructor(pendingFilmsService: PendingFilmsService) {
    this.pendingFilmsService = pendingFilmsService;
  }

  async getList(_: FastifyRequest, reply: FastifyReply) {
    const list = await this.pendingFilmsService.getList();

    reply.code(ResponseCode.OK).send(list);
  }
}
