import { FilmsModel } from './films.model';
import { FindAllQueries } from './types';
import { ChaptersService } from '../chapters/chapters.service';
import { mapFilters } from './helpers';
import { ActorsService } from '../actors/actors.service';
import { ActorType } from '../actors/types';

class FilmsService {
  async getFilteredFilms(queries: FindAllQueries) {
    const { limit, skip } = queries;

    const parsedFilters = mapFilters(queries);

    const films = await FilmsModel.find(
      parsedFilters,
      { _id: 1, title: 1, poster: 1, year: 1, collections: 1, releaseDate: 1 },
      { limit, skip, sort: { releaseDate: -1 } },
    );

    const total = await FilmsModel.countDocuments(parsedFilters);

    const additionalInfo = await this.#populateAdditionalData(queries);

    return { films, total, additionalInfo };
  }

  async getOneFilm(id: string) {
    const film = await FilmsModel.findById(id)
      .populate(['cast.actor', 'awards.nominations.actor'])
      .lean();

    if (film?.chaptersId) {
      const chapters = await this.#getFilmChapters(film.chaptersId);

      return {
        ...film,
        chapters,
      };
    }

    return film;
  }

  async getAnniversaries() {
    const today = this.#getFormattedDate(new Date());

    const films = await FilmsModel.find(
      {
        releaseDate: today,
      },
      { _id: 1, title: 1 },
    );

    return films;
  }

  async getRandomFilms() {
    return await FilmsModel.aggregate([
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
    return await FilmsModel.find(
      {
        title: {
          $regex: searchString,
          $options: 'i',
        },
      },
      { _id: 1, title: 1, poster: 1, genres: 1, releaseDate: 1 },
    );
  }

  async #populateAdditionalData(query: FindAllQueries) {
    const { actorId, personName, personRole, collection, awards } = query;

    if (actorId) {
      const actorsService = new ActorsService();
      const actorData = await actorsService.getActorById(actorId).lean();

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

  #getFormattedDate(date: Date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
  }

  async #getFilmChapters(id: string) {
    const chaptersService = new ChaptersService();
    const chapters = await chaptersService.findChapters(id);

    if (!chapters) {
      return [];
    }

    const chaptersList = await FilmsModel.find(
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

    return orderedList;
  }
}

export { FilmsService };
