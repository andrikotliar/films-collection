import { type Deps } from '~/shared';
import type { FilmsRepository } from './films.repository';
import {
  type GetAdminListQuery,
  type GetFilmsListQuery,
  type GetFilmOptionsQuery,
  PAGE_LIMITS,
  getSkipValue,
  convertEnumValueToLabel,
} from '@films-collection/shared';
import { mapAdminListFilters, mapFilmDetails, mapListFilters } from './helpers';
import type { PeopleService } from '~/services/people/people.service';
import type { AwardsService } from '~/services/awards/awards.service';
import type { CollectionsService } from '~/services/collections/collections.service';

export class FilmsService {
  private readonly filmsRepository: FilmsRepository;
  private readonly peopleService: PeopleService;
  private readonly awardsService: AwardsService;
  private readonly collectionsService: CollectionsService;

  constructor(
    deps: Deps<'filmsRepository' | 'peopleService' | 'awardsService' | 'collectionsService'>,
  ) {
    this.filmsRepository = deps.filmsRepository;
    this.peopleService = deps.peopleService;
    this.awardsService = deps.awardsService;
    this.collectionsService = deps.collectionsService;
  }

  async getFilteredFilms(queries: GetFilmsListQuery) {
    const { pageIndex } = queries;

    const parsedFilters = mapListFilters(queries);

    const data = await this.filmsRepository.findAndCount(
      parsedFilters,
      PAGE_LIMITS.filmsList,
      getSkipValue('filmsList', pageIndex),
    );

    const additionalInfo = await this.populateAdditionalData(queries);

    return { films: data.list, total: data.total, additionalInfo };
  }

  async getFilmDetails(id: number) {
    const film = await this.filmsRepository.findById(id);

    if (!film) {
      return null;
    }

    const chapters = film.chapterKey
      ? await this.filmsRepository.findChapters(film.id, film.chapterKey)
      : null;

    const mappedFilm = mapFilmDetails(film, chapters);

    return mappedFilm;
  }

  async getFilmDetailsAdmin(id: number) {
    const data = await this.filmsRepository.findByIdAdmin(id);

    if (!data) {
      return null;
    }

    return {
      id: data.id,
      title: data.title,
    };
  }

  async searchFilm(searchString: string) {
    const films = await this.filmsRepository.searchByTitle(searchString);

    return films.map((film) => ({
      ...film,
      genres: film.genres.map((g) => g.genre),
    }));
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

  getRelatedChapters(filmId: number, chapterKey: string) {
    return this.filmsRepository.findChapters(filmId, chapterKey);
  }

  getFilmsTotal() {
    return this.filmsRepository.count();
  }

  private async populateAdditionalData(query: GetFilmsListQuery) {
    const { personId, personRole, collectionId, awardId } = query;

    if (personId && personRole) {
      const crewMember = await this.peopleService.getPersonById(personId);

      if (!crewMember) {
        return null;
      }

      return {
        type: 'crew' as const,
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
        type: 'collection' as const,
        data: collection,
      };
    }

    if (awardId) {
      const award = await this.awardsService.getBaseAwardData(awardId);

      if (!award) {
        return null;
      }

      return {
        type: 'award' as const,
        data: award,
      };
    }

    return null;
  }

  async getFilmOptions(queries: GetFilmOptionsQuery) {
    const films = await this.filmsRepository.getFilmsListByQuery(queries);

    return films.map((film) => ({
      label: film.title,
      value: film.id,
    }));
  }

  updateFilmWatchCount(filmId: number, value: number) {
    return this.filmsRepository.updateWatchCounter(filmId, value);
  }

  async deleteFilm(id: number) {
    const deleteFilm = await this.filmsRepository.delete(id, new Date());

    return { id: deleteFilm.id };
  }
}
