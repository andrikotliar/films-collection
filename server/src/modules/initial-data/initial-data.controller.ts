import { FastifyRequest, FastifyReply } from 'fastify';
import { InitialDataService } from './initial-data.service';
import { ResponseCode } from 'src/common';

export class InitialDataController {
  initialDataService!: InitialDataService;

  async getConfig(_: FastifyRequest, reply: FastifyReply): Promise<never> {
    const data = await this.initialDataService.getOptions();

    return reply.code(ResponseCode.OK).send(data);
  }
}
