import { convertEnumValueToLabel } from 'src/common';
import { FilmsServiceDependencies } from './types';
import { FilmsRepository } from './films.repository';
import { FilmsAdminQuery, FilmsQuery } from './schemas';
import { mapAdminListFilters, mapFilmDetails, mapListFilters } from './helpers';

export class FilmsService {
  private peopleService: FilmsServiceDependencies['peopleService'];
  private awardsService: FilmsServiceDependencies['awardsService'];
  private collectionsService: FilmsServiceDependencies['collectionsService'];

  constructor(
    private filmsRepository: FilmsRepository,
    dependencies: FilmsServiceDependencies,
  ) {
    this.peopleService = dependencies.peopleService;
    this.awardsService = dependencies.awardsService;
    this.collectionsService = dependencies.collectionsService;
  }

  async getFilteredFilms(queries: FilmsQuery) {
    const { limit, skip } = queries;

    const parsedFilters = mapListFilters(queries);

    if (queries.searchAnniversaries && !parsedFilters.id) {
      const films = await this.filmsRepository.findAnniversariesIdsRaw();
      const ids = films.map((film) => film.id);

      parsedFilters.id = {
        in: ids,
      };
    }

    const data = await this.filmsRepository.findAndCount(
      parsedFilters,
      limit,
      skip,
    );

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

  searchFilm(searchString: string) {
    return this.filmsRepository.searchByTitle(searchString);
  }

  getAdminList(query: FilmsAdminQuery) {
    const { skip = 0, order = 'desc', orderKey = 'createdAt' } = query;

    const filters = mapAdminListFilters(query);

    return this.filmsRepository.findAndCountAdmin(filters, {
      skip,
      limit: 30,
      orderBy: { [orderKey]: order },
    });
  }

  private async populateAdditionalData(query: FilmsQuery) {
    const { actorId, crewMemberId, crewMemberPosition, collectionId, awardId } =
      query;

    if (actorId) {
      const actorData = await this.peopleService.getPersonById(actorId);

      if (!actorData) {
        return null;
      }

      return {
        type: 'actor',
        data: actorData,
      };
    }

    if (crewMemberId && crewMemberPosition) {
      const crewMember = await this.peopleService.getPersonById(crewMemberId);

      if (!crewMember) {
        return null;
      }

      return {
        type: 'crew',
        data: {
          role: convertEnumValueToLabel(crewMemberPosition),
          name: crewMember.name,
        },
      };
    }

    if (collectionId) {
      const collection = await this.collectionsService.getCollectionById(
        collectionId,
      );

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
}
