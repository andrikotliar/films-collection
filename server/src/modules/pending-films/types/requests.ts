import { FastifyRequest } from 'fastify';
import { GetListQuery } from './filters';
import { CreatePendingFilmInput, UpdatePendingFilmInput } from './inputs';

export type CreatePendingFilmRequest = FastifyRequest<{
  Body: CreatePendingFilmInput;
}>;

export type GetPendingFilmRequest = FastifyRequest<{
  Querystring: GetListQuery;
}>;

export type DeletePendingFilmRequest = FastifyRequest<{
  Params: {
    id: number;
  };
}>;

export type UpdatePendingFilmRequest = FastifyRequest<{
  Body: UpdatePendingFilmInput;
  Params: {
    id: number;
  };
}>;
