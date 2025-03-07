import { FastifyReply, FastifyRequest } from 'fastify';
import { ResponseCode } from 'src/common';
import { CollectionEventsService } from './collection-events.service';
import {
  CollectionEventsCreatePayload,
  CollectionEventsDeleteParams,
  CollectionEventsUpdateParams,
  CollectionEventsUpdatePayload,
} from './schemas';

export class CollectionEventsController {
  collectionEventsService!: CollectionEventsService;

  async createEvent(
    request: FastifyRequest<{ Body: CollectionEventsCreatePayload }>,
    reply: FastifyReply,
  ) {
    const createdEvent = await this.collectionEventsService.createEvent(
      request.body,
    );

    return reply.code(ResponseCode.CREATED).send(createdEvent);
  }

  async getAllEvents(_: FastifyRequest, reply: FastifyReply) {
    const events = await this.collectionEventsService.getAllEvents();

    return reply.code(ResponseCode.OK).send(events);
  }

  async deleteEvent(
    request: FastifyRequest<{ Params: CollectionEventsDeleteParams }>,
    reply: FastifyReply,
  ) {
    const result = await this.collectionEventsService.deleteEvent(
      request.params.id,
    );

    return reply.code(ResponseCode.OK).send(result);
  }

  async updateEvent(
    request: FastifyRequest<{
      Params: CollectionEventsUpdateParams;
      Body: CollectionEventsUpdatePayload;
    }>,
    reply: FastifyReply,
  ) {
    const result = await this.collectionEventsService.updateEvent(
      request.params.id,
      request.body,
    );

    return reply.code(ResponseCode.OK).send(result);
  }
}
