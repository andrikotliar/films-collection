import { type Deps, throwIfNotFound } from '~/shared';
import {
  type GetAdminListQuery,
  type GetFilmsListQuery,
  type GetFilmOptionsQuery,
  convertEnumValueToLabel,
  type CreateFilmInput,
  type UpdateFilmInput,
} from '@films-collection/shared';
import { mapFilmDetails, mapAdminFilmDetails } from './helpers';

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
    const data = await this.deps.filmsRepository.findAndCount(queries);

    const additionalInfo = await this.populateAdditionalData(queries);

    return { list: data.list, total: data.total, additionalInfo };
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

  getAdminList(queries: GetAdminListQuery) {
    return this.deps.filmsRepository.findAndCountAdmin(queries);
  }

  async getRelatedChapters(chapterKey: string) {
    const chapters = await this.deps.filmsRepository.findChapters(chapterKey);

    return chapters.map((chapter) => ({
      ...chapter,
      chapterOrder: !isNaN(Number(chapter.chapterOrder)) ? Number(chapter.chapterOrder) : null,
    }));
  }

  getFilmsTotal() {
    return this.deps.filmsRepository.count();
  }

  async getEditableFilm(id: number) {
    const film = await throwIfNotFound(this.deps.filmsRepository.getEditableFilm(id));

    return mapAdminFilmDetails(film);
  }

  async createFilm(input: CreateFilmInput) {
    const { pendingFilmId, ...payload } = input;

    const newFilmId = await this.deps.filmsRepository.create(payload);

    if (pendingFilmId) {
      await this.deps.pendingFilmsService.deletePendingFilm(pendingFilmId);
    }

    return await this.getFilmDetails(newFilmId);
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
    await this.deps.filmsRepository.delete(id, new Date().toISOString());

    return { id };
  }

  async updateFilm(filmId: number, input: UpdateFilmInput) {
    await this.deps.filmsRepository.updateFilm(filmId, input);
    return this.getFilmDetails(filmId);
  }
}
