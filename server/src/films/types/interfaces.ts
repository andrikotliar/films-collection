import { FastifyReply, FastifyRequest } from 'fastify';
import {
  Anniversary,
  FilteredFilms,
  FilmBaseData,
  SearchedFilm,
  SingleFilm,
} from './films';
import { FindAllQueries } from './filters';
import { FindAllRequest, FindOneRequest, SearchRequest } from './requests';

interface IFilmsService {
  getFilteredFilms(queries: FindAllQueries): Promise<FilteredFilms>;
  getOneFilm(id: string): Promise<SingleFilm | null>;
  getAnniversaries(): Promise<Anniversary[]>;
  getRandomFilms(): Promise<FilmBaseData[]>;
  searchFilm(searchString: string): Promise<SearchedFilm[]>;
  getFilmChapters(id: string): Promise<FilmBaseData[]>;
}

interface IFilmsController {
  findAll(request: FindAllRequest, reply: FastifyReply): Promise<never>;
  findOne(request: FindOneRequest, reply: FastifyReply): Promise<never>;
  findAnniversaries(
    request: FastifyRequest,
    reply: FastifyReply,
  ): Promise<never>;
  findRandomFilms(request: FastifyRequest, reply: FastifyReply): Promise<never>;
  findFilmsBySearchString(
    request: SearchRequest,
    reply: FastifyReply,
  ): Promise<never>;
}

export { IFilmsService, IFilmsController };
