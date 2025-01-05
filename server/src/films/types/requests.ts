import { FastifyRequest } from 'fastify';
import {
  FindAllQueries,
  FindBySearchString,
  IdParams,
  GetAdminFilmsListQueries,
} from './filters';
import { UpdateFilmPayload } from './films';

export type FindAllRequest = FastifyRequest<{ Querystring: FindAllQueries }>;

export type SearchRequest = FastifyRequest<{ Querystring: FindBySearchString }>;

export type FindOneRequest = FastifyRequest<{ Params: IdParams }>;

export type GetAdminFilmsListRequest = FastifyRequest<{
  Querystring: GetAdminFilmsListQueries;
}>;

export type DeleteFilmRequest = FastifyRequest<{ Params: IdParams }>;

export type UpdateFilmRequest = FastifyRequest<{
  Params: IdParams;
  Body: UpdateFilmPayload;
}>;
