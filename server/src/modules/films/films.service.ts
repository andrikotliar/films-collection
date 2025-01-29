import { Prisma, PublishStatus } from '@prisma/client';
import { convertEnumValueToLabel } from 'src/common';
import {
  AdditionalInfo,
  FilmsServiceDependencies,
  FindAllFilters,
  FindAllQueries,
} from './types';
import { getArrayFilter, getMoneyRangeFilter } from './helpers';
import { FilmsRepository } from './films.repository';

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

  async getFilteredFilms(queries: FindAllQueries) {
    const { limit, skip } = queries;

    const parsedFilters = this.mapFilters(queries);

    const data = await this.filmsRepository.findAndCount(
      parsedFilters,
      limit,
      skip,
    );

    const additionalInfo = await this.populateAdditionalData(queries);

    return { films: data.list, total: data.total, additionalInfo };
  }

  async getFilmDetails(id: number) {
    return this.filmsRepository.findById(id);
  }

  async getAnniversaries() {
    const currentDate = new Date();
    const month = currentDate.getMonth() + 1;
    const day = currentDate.getDate();
    const currentYear = currentDate.getFullYear();

    const films = await this.filmsRepository.findAnniversariesRaw(day, month);

    // const mappedData = films.map((film) => {
    //   const releaseDate = new Date(film.releaseDate);
    //   const releaseYear = releaseDate.getFullYear();
    //   const releaseDiff = currentYear - releaseYear;

    //   return {
    //     _id: film._id,
    //     title: film.title,
    //     diff: releaseDiff,
    //   };
    // });

    // return mappedData;

    return films;
  }

  searchFilm(searchString: string) {
    return this.filmsRepository.searchByTitle(searchString);
  }

  private async populateAdditionalData(
    query: FindAllQueries,
  ): Promise<AdditionalInfo | null> {
    const {
      actorId,
      crewMemberId,
      crewMemberPosition,
      collectionId,
      awardIds,
    } = query;

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

    if (awardIds) {
      const awards = await this.awardsService.getListBaseData(awardIds);

      return {
        type: 'awards',
        data: awards,
      };
    }

    return null;
  }

  private mapFilters(plainFilters: Partial<FindAllFilters>) {
    const {
      genreIds,
      collectionId,
      studioIds,
      countryIds,
      type,
      startDate,
      endDate,
      watchCount,
      rating,
      seasonsTotal,
      episodesTotal,
      duration,
      crewMemberId,
      crewMemberPosition,
      actorId,
      awardIds,
      style,
      budget,
      boxOffice,
    } = plainFilters;

    const filters: Prisma.FilmWhereInput = {
      publishStatus: {
        not: PublishStatus.DRAFT,
      },
    };

    if (startDate || endDate) {
      filters.releaseDate = {
        gte: startDate,
        lte: endDate,
      };
    }

    if (type) {
      filters.type = type;
    }

    if (style) {
      filters.style = style;
    }

    if (genreIds) {
      filters.genres = getArrayFilter(genreIds);
    }

    if (studioIds) {
      filters.studios = getArrayFilter(studioIds);
    }

    if (countryIds) {
      filters.countries = getArrayFilter(countryIds);
    }

    if (collectionId) {
      filters.collections = {
        every: {
          filmId: collectionId,
        },
      };
    }

    if (watchCount) {
      filters.watchCount = watchCount;
    }

    if (rating) {
      filters.rating = rating;
    }

    if (duration) {
      filters.duration = duration;
    }

    if (seasonsTotal || episodesTotal) {
      filters.seriesExtension = {
        seasonsTotal,
        episodesTotal,
      };
    }

    if (crewMemberId && crewMemberPosition) {
      filters.crew = {
        every: {
          AND: {
            position: crewMemberPosition,
            personId: crewMemberId,
          },
        },
      };
    }

    if (actorId) {
      filters.cast = {
        every: {
          personId: actorId,
        },
      };
    }

    if (awardIds) {
      filters.awards = {
        every: {
          awardId: {
            in: awardIds,
          },
        },
      };
    }

    if (budget) {
      filters.budget = getMoneyRangeFilter(budget);
    }

    if (boxOffice) {
      filters.boxOffice = getMoneyRangeFilter(boxOffice);
    }

    return filters;
  }
}
