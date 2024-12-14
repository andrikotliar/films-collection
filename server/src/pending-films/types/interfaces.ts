import { FastifyReply, FastifyRequest } from 'fastify';
import { PendingFilmEntity } from './pending-film.entity';
import { CreatePendingFilmRequest } from './requests';

export interface IPendingFilmsService {
  getList(): Promise<PendingFilmEntity[]>;
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
