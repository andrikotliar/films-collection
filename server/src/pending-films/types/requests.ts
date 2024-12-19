import { FastifyRequest } from 'fastify';
import { PendingFilmEntity } from './pending-film.entity';
import { GetListQuery } from './get-list-query';
import { UpdatePendingFilmPayload } from './update-pending-film-payload';

export type CreatePendingFilmRequest = FastifyRequest<{
  Body: Pick<PendingFilmEntity, 'title' | 'priority'>;
}>;

export type GetPendingFilmRequest = FastifyRequest<{
  Querystring: GetListQuery;
}>;

export type DeletePendingFilmRequest = FastifyRequest<{
  Params: {
    filmId: string;
  };
}>;

export type UpdatePendingFilmRequest = FastifyRequest<{
  Body: UpdatePendingFilmPayload;
  Params: {
    filmId: string;
  };
}>;
