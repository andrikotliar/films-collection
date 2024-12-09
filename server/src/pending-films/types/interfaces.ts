import { FastifyReply, FastifyRequest } from 'fastify';
import { PendingFilmEntity } from './pending-film.entity';

export interface IPendingFilmsService {
  getList(): Promise<PendingFilmEntity[]>;
}

export interface IPendingFilmsController {
  getList(request: FastifyRequest, reply: FastifyReply): Promise<never>;
}
