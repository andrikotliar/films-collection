import { FastifyRequest } from 'fastify';
import { PendingFilmEntity } from './pending-film.entity';

export type CreatePendingFilmRequest = FastifyRequest<{
  Body: Pick<PendingFilmEntity, 'title' | 'priority'>;
}>;
