import { convertEnumValueToLabel } from 'src/common';
import { FilmsServiceDependencies } from './types';
import { FilmsRepository } from './films.repository';
import {
  GetFilmRelatedChaptersQuery,
  GetAdminListQuery,
  GetFilmsListQuery,
  type FilmOptionsQueries,
} from './schemas';
import { mapAdminListFilters, mapFilmDetails, mapListFilters } from './helpers';

export class FilmsService {
  private peopleService: FilmsServiceDependencies['peopleService'];
  private awardsService: FilmsServiceDependencies['awardsService'];
  private collectionsService: FilmsServiceDependencies['collectionsService'];

  constructor(private filmsRepository: FilmsRepository, dependencies: FilmsServiceDependencies) {
    this.peopleService = dependencies.peopleService;
    this.awardsService = dependencies.awardsService;
    this.collectionsService = dependencies.collectionsService;
  }

  async getFilteredFilms(queries: GetFilmsListQuery) {
    const { limit, skip } = queries;

    const parsedFilters = mapListFilters(queries);

    const data = await this.filmsRepository.findAndCount(parsedFilters, limit, skip);

    const additionalInfo = await this.populateAdditionalData(queries);

    return { films: data.list, total: data.total, additionalInfo };
  }

  async getFilmDetails(id: number) {
    const film = await this.filmsRepository.findById(id);

    if (!film) {
      return null;
    }

    const mappedFilm = mapFilmDetails(film);

    if (film.chapterKey) {
      const chapters = await this.filmsRepository.findChapters(film.chapterKey);

      return {
        ...mappedFilm,
        chapters,
      };
    }

    return mappedFilm;
  }

  async getFilmDetailsAdmin(id: number) {
    const data = await this.filmsRepository.findByIdAdmin(id);

    if (!data) {
      return null;
    }

    console.log(data);

    return {
      data: true,
    };
  }

  searchFilm(searchString: string) {
    return this.filmsRepository.searchByTitle(searchString);
  }

  getAdminList(query: GetAdminListQuery) {
    const { skip = 0, order = 'desc', orderKey = 'createdAt' } = query;

    const filters = mapAdminListFilters(query);

    return this.filmsRepository.findAndCountAdmin(filters, {
      skip,
      limit: 32,
      orderBy: { [orderKey]: order },
    });
  }

  getRelatedChapters(query: GetFilmRelatedChaptersQuery) {
    return this.filmsRepository.findChapters(query.key, query.filmId);
  }

  private async populateAdditionalData(query: GetFilmsListQuery) {
    const { personId, personRole, collectionId, awardId } = query;

    if (personId && personRole) {
      const crewMember = await this.peopleService.getPersonById(personId);

      if (!crewMember) {
        return null;
      }

      return {
        type: 'crew',
        data: {
          role: convertEnumValueToLabel(personRole),
          name: crewMember.name,
        },
      };
    }

    if (collectionId) {
      const collection = await this.collectionsService.getCollectionById(collectionId);

      if (!collection) {
        return null;
      }

      return {
        type: 'collection',
        data: collection,
      };
    }

    if (awardId) {
      const award = await this.awardsService.getAwardById(awardId);

      if (!award) {
        return null;
      }

      return {
        type: 'award',
        data: award,
      };
    }

    return null;
  }

  async getFilmOptions(queries: FilmOptionsQueries) {
    const films = await this.filmsRepository.getFilmsListByQuery(queries);

    return films.map((film) => ({
      label: film.title,
      value: film.id,
    }));
  }
}
