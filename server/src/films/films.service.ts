import { FilmsModel } from './films.model.js';
import { FindAllQueries } from './common/index.js';
import { ChaptersService } from '../chapters/chapters.service.js';
import { mapFilters } from './helpers/index.js';

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

    return { films, total };
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
