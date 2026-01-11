import { NotFoundException, type Deps } from '~/shared';
import type { FilmsRepository } from './films.repository';
import {
  type GetAdminListQuery,
  type GetFilmsListQuery,
  type GetFilmOptionsQuery,
  PAGE_LIMITS,
  getSkipValue,
  convertEnumValueToLabel,
  type CreateFilmInput,
} from '@films-collection/shared';
import {
  mapAdminListFilters,
  mapFilmDetails,
  mapListFilters,
  mapAdminFilmDetails,
} from './helpers';
import type { PeopleService } from '~/services/people/people.service';
import type { AwardsService } from '~/services/awards/awards.service';
import type { CollectionsService } from '~/services/collections/collections.service';
import type { PendingFilmsService } from '~/services/pending-films';

export class FilmsService {
  private readonly filmsRepository: FilmsRepository;
  private readonly peopleService: PeopleService;
  private readonly awardsService: AwardsService;
  private readonly collectionsService: CollectionsService;
  private readonly pendingFilmsService: PendingFilmsService;

  constructor(
    deps: Deps<
      | 'filmsRepository'
      | 'peopleService'
      | 'awardsService'
      | 'collectionsService'
      | 'pendingFilmsService'
    >,
  ) {
    this.filmsRepository = deps.filmsRepository;
    this.peopleService = deps.peopleService;
    this.awardsService = deps.awardsService;
    this.collectionsService = deps.collectionsService;
    this.pendingFilmsService = deps.pendingFilmsService;
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
      ? await this.filmsRepository.findChapters(film.chapterKey)
      : null;

    const mappedFilm = mapFilmDetails(film, chapters);

    return mappedFilm;
  }

  async searchFilm(searchString?: string | null) {
    if (!searchString) {
      return [];
    }
    const films = await this.filmsRepository.searchByTitle(searchString);

    return films.map((film) => ({
      ...film,
      genres: film.genres.map((g) => g.genre),
    }));
  }

  getAdminList(query: GetAdminListQuery) {
    const { pageIndex = 0, order = 'desc', orderKey = 'createdAt' } = query;

    const filters = mapAdminListFilters(query);
    const skip = getSkipValue('default', pageIndex);

    return this.filmsRepository.findAndCountAdmin(filters, {
      skip,
      orderBy: { [orderKey]: order },
    });
  }

  getRelatedChapters(chapterKey: string) {
    return this.filmsRepository.findChapters(chapterKey);
  }

  getFilmsTotal() {
    return this.filmsRepository.count();
  }

  async getEditableFilm(id: number) {
    const film = await this.filmsRepository.getEditableFilm(id);

    if (!film) {
      throw new NotFoundException();
    }

    return mapAdminFilmDetails(film);
  }

  async createFilm(input: CreateFilmInput) {
    const { pendingFilmId, ...payload } = input;

    const newFilm = await this.filmsRepository.create(payload);

    if (pendingFilmId) {
      await this.pendingFilmsService.deletePendingFilm(pendingFilmId);
    }

    return await this.getFilmDetails(newFilm.id);
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
