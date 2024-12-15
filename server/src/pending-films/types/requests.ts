import { FastifyRequest } from 'fastify';
import { PendingFilmEntity } from './pending-film.entity';
import { GetListQuery } from './get-list-query';

export type CreatePendingFilmRequest = FastifyRequest<{
  Body: Pick<PendingFilmEntity, 'title' | 'priority'>;
}>;

export type GetPendingFilmRequest = FastifyRequest<{
  Querystring: GetListQuery;
}>;
