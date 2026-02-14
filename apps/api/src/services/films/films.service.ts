import { NotFoundException, type Deps } from '~/shared';
import {
  type GetAdminListQuery,
  type GetFilmsListQuery,
  type GetFilmOptionsQuery,
  PAGE_LIMITS,
  getSkipValue,
  convertEnumValueToLabel,
  type CreateFilmInput,
  type UpdateFilmInput,
} from '@films-collection/shared';
import {
  mapAdminListFilters,
  mapFilmDetails,
  mapListFilters,
  mapAdminFilmDetails,
} from './helpers';
import type { Prisma } from '@prisma/client';

export class FilmsService {
  constructor(
    private readonly deps: Deps<
      | 'filmsRepository'
      | 'peopleService'
      | 'awardsService'
      | 'collectionsService'
      | 'pendingFilmsService'
    >,
  ) {}

  async getFilteredFilms(queries: GetFilmsListQuery) {
    const { pageIndex } = queries;

    const parsedFilters = mapListFilters(queries);

    const data = await this.deps.filmsRepository.findAndCount(
      parsedFilters,
      PAGE_LIMITS.filmsList,
      getSkipValue('filmsList', pageIndex),
    );

    const additionalInfo = await this.populateAdditionalData(queries);

    return { films: data.list, total: data.total, additionalInfo };
  }

  async getFilmDetails(id: number) {
    const film = await this.deps.filmsRepository.findById(id);

    if (!film) {
      return null;
    }

    const chapters = film.chapterKey
      ? await this.deps.filmsRepository.findChapters(film.chapterKey)
      : null;

    const mappedFilm = mapFilmDetails(film, chapters);

    return mappedFilm;
  }

  async searchFilm(searchString?: string | null) {
    if (!searchString) {
      return [];
    }
    const films = await this.deps.filmsRepository.searchByTitle(searchString);

    return films.map((film) => ({
      ...film,
      genres: film.genres.map((g) => g.genre),
    }));
  }

  getAdminList(query: GetAdminListQuery) {
    const { pageIndex = 0, order = 'desc', orderKey = 'createdAt' } = query;

    const filters = mapAdminListFilters(query);
    const skip = getSkipValue('default', pageIndex);

    return this.deps.filmsRepository.findAndCountAdmin(filters, {
      skip,
      orderBy: { [orderKey]: order },
    });
  }

  getRelatedChapters(chapterKey: string) {
    return this.deps.filmsRepository.findChapters(chapterKey);
  }

  getFilmsTotal() {
    return this.deps.filmsRepository.count();
  }

  async getEditableFilm(id: number) {
    const film = await this.deps.filmsRepository.getEditableFilm(id);

    if (!film) {
      throw new NotFoundException();
    }

    return mapAdminFilmDetails(film);
  }

  async createFilm(input: CreateFilmInput) {
    const { pendingFilmId, ...payload } = input;

    const newFilm = await this.deps.filmsRepository.create(payload);

    if (pendingFilmId) {
      await this.deps.pendingFilmsService.deletePendingFilm(pendingFilmId);
    }

    return await this.getFilmDetails(newFilm.id);
  }

  private async populateAdditionalData(query: GetFilmsListQuery) {
    const { personId, personRole, collectionId, awardId } = query;

    if (personId && personRole) {
      const crewMember = await this.deps.peopleService.getPersonById(personId);

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
      const collection = await this.deps.collectionsService.getCollectionById(collectionId);

      if (!collection) {
        return null;
      }

      return {
        type: 'collection' as const,
        data: collection,
      };
    }

    if (awardId) {
      const award = await this.deps.awardsService.getBaseAwardData(awardId);

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
    const films = await this.deps.filmsRepository.getFilmsListByQuery(queries);

    return films.map((film) => ({
      label: film.title,
      value: film.id,
    }));
  }

  async deleteFilm(id: number) {
    const deleteFilm = await this.deps.filmsRepository.delete(id, new Date());

    return { id: deleteFilm.id };
  }

  async updateFilm(filmId: number, input: UpdateFilmInput) {
    const {
      trailers,
      studios,
      countries,
      collections,
      castAndCrew,
      awards,
      genres,
      description,
      seriesExtension,
      releaseDate,
      ...updatedParams
    } = input;

    const params: Prisma.FilmUpdateInput = {
      ...updatedParams,
    };

    if (description) {
      params.overview = description;
    }

    if (releaseDate) {
      params.releaseDate = new Date(releaseDate).toISOString();
    }

    const updateFilmPromise = this.deps.filmsRepository.updateFilm(filmId, params);

    const promises: Prisma.PrismaPromise<any>[] = [updateFilmPromise];

    if (awards) {
      const promise = await this.deps.filmsRepository.updateFilmAwards(filmId, awards);
      promises.push(promise());
    }

    if (trailers) {
      const promise = await this.deps.filmsRepository.updateFilmTrailers(filmId, trailers);
      promises.push(promise());
    }

    if (studios) {
      const promise = await this.deps.filmsRepository.updateFilmStudios(filmId, studios);
      promises.push(promise());
    }

    if (countries) {
      const promise = await this.deps.filmsRepository.updateFilmCountries(filmId, countries);
      promises.push(promise());
    }

    if (collections) {
      const promise = await this.deps.filmsRepository.updateFilmCollections(filmId, collections);
      promises.push(promise());
    }

    if (castAndCrew) {
      const promise = await this.deps.filmsRepository.updateFilmCastAndCrew(filmId, castAndCrew);
      promises.push(promise());
    }

    if (genres) {
      const promise = await this.deps.filmsRepository.updateFilmGenres(filmId, genres);
      promises.push(promise());
    }

    if (seriesExtension) {
      const promise = this.deps.filmsRepository.updateSeriesExtension(filmId, seriesExtension);
      promises.push(promise);
    }

    await this.deps.filmsRepository.transaction(promises);

    return this.getFilmDetails(filmId);
  }
}
