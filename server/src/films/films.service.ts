import { AdditionalInfo, FilmsServiceDependencies, FindAllQueries, IFilmsService } from './types';
import { getFormattedDate, mapFilters } from './helpers';
import { ActorType } from '../actors/types';

class FilmsService implements IFilmsService {
  private filmsModel;
  private actorsService;
  private chaptersService;

  constructor({ filmsModel, actorsService, chaptersService }: FilmsServiceDependencies) {
    this.filmsModel = filmsModel;
    this.actorsService = actorsService;
    this.chaptersService = chaptersService;
  }

  async getFilteredFilms(queries: FindAllQueries) {
    const { limit, skip } = queries;

    const parsedFilters = mapFilters(queries);

    const films = await this.filmsModel.find(
      parsedFilters,
      { _id: 1, title: 1, poster: 1, collections: 1, releaseDate: 1 },
      { limit, skip, sort: { releaseDate: -1 } },
    );

    const total = await this.filmsModel.countDocuments(parsedFilters);

    const additionalInfo = await this.#populateAdditionalData(queries);

    return { films, total, additionalInfo };
  }

  async getOneFilm(id: string) {
    const film = await this.filmsModel.findById(id)
      .populate(['cast.actor', 'awards.nominations.actor'])
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
    const today = getFormattedDate(new Date());

    const films = await this.filmsModel.find(
      {
        releaseDate: today,
      },
      { _id: 1, title: 1 },
    );

    return films;
  }

  async getRandomFilms() {
    return await this.filmsModel.aggregate([
      {
        $sample: {
          size: 10,
        },
      },
      {
        $project: {
          _id: 1,
          title: 1,
          poster: 1,
        },
      },
    ]);
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

    const filteredList = orderedList.filter(film => film !== undefined);

    return filteredList;
  }

  async #populateAdditionalData(query: FindAllQueries): Promise<AdditionalInfo | null> {
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
      return {
        type: 'collection',
        data: collection,
      };
    }

    if (awards) {
      return {
        type: 'awards',
        data: awards,
      };
    }

    return null;
  }
}

export { FilmsService };
