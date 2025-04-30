import { FastifyReply, FastifyRequest } from 'fastify';
import { ResponseCode } from 'src/common';
import { AwardsService } from './awards.service';
import { FindNominationsQuery } from './schemas';

export class AwardsController {
  awardsService!: AwardsService;

  async findNominations(
    request: FastifyRequest<{ Querystring: FindNominationsQuery }>,
    reply: FastifyReply,
  ) {
    if (!request.query.awardId) {
      return reply.status(ResponseCode.OK).send([]);
    }

    const result = await this.awardsService.getNominationsListOptions(
      request.query.awardId,
    );

    return reply.status(ResponseCode.OK).send(result);
  }
}
