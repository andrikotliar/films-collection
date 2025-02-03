import {
  AdditionalInfo,
  FilmsServiceDependencies,
  FindAllQueries,
} from './types';
import { getFormattedDate, mapFilters } from './helpers';
import { ActorType } from '../actors/types';
import { Collection } from 'src/collections/types';

export class FilmsService {
  private filmsModel;
  private actorsService;
  private chaptersService;
  private awardsService;
  private collectionsService;

  constructor({
    filmsModel,
    actorsService,
    chaptersService,
    awardsService,
    collectionsService,
  }: FilmsServiceDependencies) {
    this.filmsModel = filmsModel;
    this.actorsService = actorsService;
    this.chaptersService = chaptersService;
    this.awardsService = awardsService;
    this.collectionsService = collectionsService;
  }

  async getFilteredFilms(queries: FindAllQueries) {
    const { limit, skip } = queries;

    const parsedFilters = mapFilters(queries);

    const films = await this.filmsModel.find(
      parsedFilters,
      { _id: 1, title: 1, poster: 1, releaseDate: 1 },
      { limit, skip, sort: { releaseDate: -1 } },
    );

    const total = await this.filmsModel.countDocuments(parsedFilters);

    const additionalInfo = await this.populateAdditionalData(queries);

    return { films, total, additionalInfo };
  }

  async getOneFilm(id: string) {
    const film = await this.filmsModel
      .findById(id)
      .populate([
        {
          path: 'cast.actor',
        },
        {
          path: 'awards.award',
          select: {
            nominations: 0,
          },
        },
        {
          path: 'awards.nominations.actor',
        },
        {
          path: 'collections.collection',
          select: {
            _id: 1,
            title: 1,
          },
        },
      ])
      .lean();

    if (film?.chaptersId) {
      const chapters = await this.getFilmChapters(film.chaptersId);

      return {
        ...film,
        chapters,
      };
    }

    return film;
  }

  async getAnniversaries() {
    const currentDate = new Date();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const day = String(currentDate.getDate()).padStart(2, '0');
    const currentYear = currentDate.getFullYear();

    const films = await this.filmsModel.find(
      {
        releaseDate: {
          $regex: `${month}-${day}$`,
        },
      },
      { _id: 1, title: 1, releaseDate: 1 },
    );

    const mappedData = films.map((film) => {
      const releaseDate = new Date(film.releaseDate);
      const releaseYear = releaseDate.getFullYear();
      const releaseDiff = currentYear - releaseYear;

      return {
        _id: film._id,
        title: film.title,
        diff: releaseDiff,
      };
    });

    return mappedData;
  }

  async searchFilm(searchString: string) {
    return await this.filmsModel.find(
      {
        title: {
          $regex: searchString,
          $options: 'i',
        },
      },
      { _id: 1, title: 1, poster: 1, genres: 1, releaseDate: 1 },
    );
  }

  async getFilmChapters(id: string) {
    const chapters = await this.chaptersService.findChapters(id);

    if (!chapters) {
      return [];
    }

    const chaptersList = await this.filmsModel.find(
      {
        _id: {
          $in: chapters?.list,
        },
      },
      { _id: 1, title: 1, poster: 1 },
    );

    const orderedList = chapters.list.map((id) =>
      chaptersList.find((chapter) => chapter._id.toString() === id),
    );

    const filteredList = orderedList.filter((film) => film !== undefined);

    return filteredList;
  }

  private async populateAdditionalData(
    query: FindAllQueries,
  ): Promise<AdditionalInfo | null> {
    const { actorId, personName, personRole, collection, awards } = query;

    if (actorId) {
      const actorData = await this.actorsService.getActorById(actorId);

      return {
        type: 'actor',
        data: actorData as ActorType,
      };
    }

    if (personName && personRole) {
      return {
        type: 'crew',
        data: {
          role: personRole,
          name: personName,
        },
      };
    }

    if (collection) {
      const collectionData = await this.collectionsService.getOneCollection(
        collection,
      );

      return {
        type: 'collection',
        data: collectionData as Collection,
      };
    }

    if (awards) {
      const awardsList = await this.awardsService.getAwardsBaseData(awards);

      return {
        type: 'awards',
        data: awardsList,
      };
    }

    return null;
  }
}
