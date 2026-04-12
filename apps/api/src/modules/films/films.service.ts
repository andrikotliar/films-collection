import { type Deps, throwIfNotFound } from '~/shared';
import {
  type GetFilmsListQuery,
  type GetFilmOptionsQuery,
  convertEnumValueToLabel,
  type CreateFilmInput,
  type UpdateFilmInput,
  type GetCompleteDataListQuery,
  type CompleteDataResponse,
  type TranslateDescriptionInput,
  type CreateFilmDraftInput,
  type FilmDraftResponse,
  type GetIncompleteFilmsQuery,
  type Enum,
  type FilmStatus,
  type IncompleteFilmsListResponse,
} from '@films-collection/shared';
import { mapFilmDetails, mapAdminFilmDetails, mapCompleteDataList, mapInnerId } from './helpers';

type GenericOption = {
  id: number;
  title: string;
  updatedAt: string;
};

export class FilmsService {
  constructor(
    private readonly deps: Deps<
      | 'filmsRepository'
      | 'peopleService'
      | 'awardsService'
      | 'collectionsService'
      | 'genresService'
      | 'countriesService'
      | 'studiosService'
      | 'aiService'
    >,
  ) {}

  async getFilteredFilms(queries: GetFilmsListQuery) {
    const data = await this.deps.filmsRepository.findAndCount({
      ...queries,
      order: 'desc',
      orderKey: 'releaseDate',
    });

    const additionalInfo = await this.populateAdditionalData(queries);

    return { list: data.list, total: data.total, additionalInfo };
  }

  async getFilmDetails(id: number, status: Enum<typeof FilmStatus> = 'ADDED') {
    const film = await this.deps.filmsRepository.findById(id, status);

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

  getAdminList(queries: GetFilmsListQuery) {
    return this.deps.filmsRepository.findAndCount({
      ...queries,
      orderKey: queries.orderKey ?? 'updatedAt',
      order: queries.order ?? 'desc',
    });
  }

  getRelatedChapters(chapterKey: string) {
    return this.deps.filmsRepository.findChapters(chapterKey);
  }

  getFilmsTotal() {
    return this.deps.filmsRepository.count();
  }

  async getEditableFilm(id: number) {
    const film = await throwIfNotFound(this.deps.filmsRepository.getEditableFilm(id));

    return mapAdminFilmDetails(film);
  }

  async createFilm(input: CreateFilmInput) {
    const { tempDraftId, ...payload } = input;

    const { filmId, status } = await this.deps.filmsRepository.create(payload);

    if (tempDraftId) {
      await this.deps.filmsRepository.deleteDraft(tempDraftId);
    }

    return await this.getFilmDetails(filmId, status);
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
    const { status } = await this.deps.filmsRepository.updateFilm(filmId, input);
    await this.deps.filmsRepository.deleteAllDraftsOfFilm(filmId.toString());
    return this.getFilmDetails(filmId, status);
  }

  async getCompleteData(queries: GetCompleteDataListQuery): Promise<CompleteDataResponse> {
    const films = await this.deps.filmsRepository.getCompleteData(queries);
    const genres = await this.deps.genresService.getBaseListData();
    const countries = await this.deps.countriesService.getBaseDataList();
    const studios = await this.deps.studiosService.getBaseDataList();
    const awards = await this.deps.awardsService.getAwardsWithNominations();
    const people = await this.deps.peopleService.getAll();

    return {
      list: mapCompleteDataList(films),
      baseData: {
        genres: this.listOptionsToDto(this.getValidatedOptions(genres, queries.newestOnly)),
        countries: this.listOptionsToDto(this.getValidatedOptions(countries, queries.newestOnly)),
        studios: this.listOptionsToDto(this.getValidatedOptions(studios, queries.newestOnly)),
        people: this.getValidatedOptions(people, queries.newestOnly).map((person) => ({
          id: person.id,
          name: person.name,
        })),
        awards: this.getValidatedOptions(awards, queries.newestOnly).map((award) => ({
          id: award.id,
          title: award.title,
          nominations: award.nominations.map((nomination) => ({
            id: nomination.id,
            title: nomination.title,
            shouldIncludeActor: nomination.shouldIncludeActor,
          })),
        })),
      },
    };
  }

  translateDescription(input: TranslateDescriptionInput) {
    return this.deps.aiService.translateToLangPrompt(input.text, input.langParams);
  }

  createDraft(filmId: string, input: CreateFilmDraftInput): Promise<FilmDraftResponse> {
    return throwIfNotFound(this.deps.filmsRepository.createDraft(filmId, input));
  }

  updateDraft(id: number, input: CreateFilmDraftInput): Promise<FilmDraftResponse> {
    return throwIfNotFound(this.deps.filmsRepository.updateDraft(id, input.content));
  }

  getDrafts(filmId: string): Promise<FilmDraftResponse[]> {
    return this.deps.filmsRepository.getDrafts(filmId);
  }

  deleteDraft(id: number) {
    return this.deps.filmsRepository.deleteDraft(id);
  }

  async getIncompleteFilmsList(
    query: GetIncompleteFilmsQuery,
  ): Promise<IncompleteFilmsListResponse> {
    const { list, count } = await this.deps.filmsRepository.getIncompleteFilmsByStatus(query);

    const mappedList = list.map((film) => ({
      ...film,
      collections: mapInnerId(film.collections, 'collectionId'),
    }));

    return { list: mappedList, count };
  }

  private getValidatedOptions<T extends { updatedAt: string }>(
    options: T[],
    newestOnly?: boolean,
  ): T[] {
    if (!newestOnly) {
      return options;
    }

    const now = new Date();
    const cutoff = new Date(now);
    cutoff.setDate(now.getDate() - 7);

    const updatedOptions = options.filter((item) => {
      const updatedDate = new Date(item.updatedAt);

      if (isNaN(updatedDate.getTime())) {
        return false;
      }

      return updatedDate >= cutoff && updatedDate <= now;
    });

    if (!updatedOptions.length) {
      return [];
    }

    return options;
  }

  private listOptionsToDto<T extends GenericOption>(
    options: T[],
  ): Pick<GenericOption, 'id' | 'title'>[] {
    return options.map((option) => ({
      id: option.id,
      title: option.title,
    }));
  }
}
