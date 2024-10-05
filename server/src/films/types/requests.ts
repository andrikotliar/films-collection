import { FastifyRequest } from 'fastify';
import { FindAllQueries, FindBySearchString, FindOneParams } from './filters';

type FindAllRequest = FastifyRequest<{ Querystring: FindAllQueries }>;

type SearchRequest = FastifyRequest<{ Querystring: FindBySearchString }>;

type FindOneRequest = FastifyRequest<{ Params: FindOneParams }>;

export type { FindAllRequest, SearchRequest, FindOneRequest };
