import { FastifyReply, FastifyRequest } from 'fastify';
import { ResponseCode } from 'src/common';
import { PeopleService } from 'src/modules/people/people.service';
import { SearchPersonQuery } from 'src/modules/people/schemas';

export class PeopleController {
  peopleService!: PeopleService;

  async searchByName(
    request: FastifyRequest<{ Querystring: SearchPersonQuery }>,
    reply: FastifyReply,
  ) {
    const result = await this.peopleService.searchPersonByTitle(request.query);

    return reply.status(ResponseCode.OK).send(result);
  }
}
