import { FastifyRequest } from 'fastify';
import {
  FindAllQueries,
  FindBySearchString,
  FindOneParams,
  GetManageFilmsListQueries,
} from './filters';

export type FindAllRequest = FastifyRequest<{ Querystring: FindAllQueries }>;

export type SearchRequest = FastifyRequest<{ Querystring: FindBySearchString }>;

export type FindOneRequest = FastifyRequest<{ Params: FindOneParams }>;

export type GetManageFilmsListRequest = FastifyRequest<{
  Querystring: GetManageFilmsListQueries;
}>;
