import { FastifyReply, FastifyRequest } from 'fastify';
import { ResponseCode } from 'src/common';
import { CollectionEventsService } from './collection-events.service';
import {
  CreateEventRequest,
  DeleteEventRequest,
  UpdateEventRequest,
} from './types';

export class CollectionEventsController {
  constructor(private collectionEventsService: CollectionEventsService) {}

  async createEvent(request: CreateEventRequest, reply: FastifyReply) {
    const createdEvent = await this.collectionEventsService.createEvent(
      request.body,
    );

    return reply.code(ResponseCode.CREATED).send(createdEvent);
  }

  async getAllEvents(_: FastifyRequest, reply: FastifyReply) {
    const events = await this.collectionEventsService.getAllEvents();

    return reply.code(ResponseCode.OK).send(events);
  }

  async deleteEvent(request: DeleteEventRequest, reply: FastifyReply) {
    const result = await this.collectionEventsService.deleteEvent(
      request.params.id,
    );

    return reply.code(ResponseCode.OK).send(result);
  }

  async updateEvent(request: UpdateEventRequest, reply: FastifyReply) {
    const result = await this.collectionEventsService.updateEvent(
      request.params.id,
      request.body,
    );

    return reply.code(ResponseCode.OK).send(result);
  }
}
