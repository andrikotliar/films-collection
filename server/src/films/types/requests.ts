import { FastifyRequest } from 'fastify';
import {
  FindAllQueries,
  FindBySearchString,
  FindOneParams,
  GetAdminFilmsListQueries,
} from './filters';

export type FindAllRequest = FastifyRequest<{ Querystring: FindAllQueries }>;

export type SearchRequest = FastifyRequest<{ Querystring: FindBySearchString }>;

export type FindOneRequest = FastifyRequest<{ Params: FindOneParams }>;

export type GetAdminFilmsListRequest = FastifyRequest<{
  Querystring: GetAdminFilmsListQueries;
}>;
