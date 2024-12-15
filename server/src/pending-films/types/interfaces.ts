import { FastifyReply, FastifyRequest } from 'fastify';
import { PendingFilmEntity } from './pending-film.entity';
import { CreatePendingFilmRequest } from './requests';
import { GetListQuery } from './get-list-query';

export interface IPendingFilmsService {
  getList(filters: Partial<GetListQuery>): Promise<PendingFilmEntity[]>;
  createPendingFilm(
    payload: Pick<PendingFilmEntity, 'title' | 'priority'>,
  ): Promise<PendingFilmEntity>;
}

export interface IPendingFilmsController {
  getList(request: FastifyRequest, reply: FastifyReply): Promise<never>;
  createPendingFilm(
    request: CreatePendingFilmRequest,
    reply: FastifyReply,
  ): Promise<never>;
}
