import { FastifyRequest, FastifyReply } from 'fastify';
import { InitialDataService } from './initial-data.service';
import { IInitialDataController } from './types';
import { ResponseCode } from 'src/common';

class InitialDataController implements IInitialDataController {
  private initialDataService;

  constructor(initialDataService: InitialDataService) {
    this.initialDataService = initialDataService;
  }

  async getConfig(_: FastifyRequest, reply: FastifyReply): Promise<never> {
    const data = await this.initialDataService.getConfig();

    return reply.code(ResponseCode.OK).send(data);
  }
}

export { InitialDataController };
