import { FastifyRequest } from 'fastify';
import { EventInput } from './inputs';

export type CreateEventRequest = FastifyRequest<{
  Body: EventInput;
}>;

export type DeleteEventRequest = FastifyRequest<{
  Params: {
    id: number;
  };
}>;

export type UpdateEventRequest = FastifyRequest<{
  Params: {
    id: number;
  };
  Body: EventInput;
}>;
