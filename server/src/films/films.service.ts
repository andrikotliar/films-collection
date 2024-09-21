import { RootFilterQuery } from 'mongoose';
import { FilmsModel } from './films.model.js';
import { FindAllFilters, FindAllQueries } from './common/index.js';
import { ChaptersService } from '../chapters/chapters.service.js';

class FilmsService {
  async getFilteredFilms(queries: FindAllQueries) {
    const { limit, skip, ...filters } = queries;

    const parsedFilters = this.#parseFilters(filters);

    const films = await FilmsModel.find(
      parsedFilters,
      { _id: 1, title: 1, media: 1, year: 1, collections: 1, releaseDate: 1 },
      { limit, skip, sort: { 'releaseDate.0': -1 } },
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
          media: 1,
        },
      },
    ]);
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

    const chaptersList = await FilmsModel.find(
      {
        _id: {
          $in: chapters?.list,
        },
      },
      { _id: 1, title: 1, media: 1 },
    );

    return chaptersList;
  }

  #parseFilters(plainFilters: Partial<FindAllFilters>) {
    const parsedFilters: RootFilterQuery<FindAllFilters> = {};

    for (const [key, value] of Object.entries(plainFilters)) {
      if (key === 'startDate' || key === 'endDate') {
        if (!parsedFilters['releaseDate.0']) {
          parsedFilters['releaseDate.0'] = {};
        }

        if (key === 'startDate' && typeof value === 'string') {
          parsedFilters['releaseDate.0'].$gte = new Date(value);
        }

        if (key === 'endDate' && typeof value === 'string') {
          parsedFilters['releaseDate.0'].$lte = new Date(value);
        }

        continue;
      }

      if (Array.isArray(value)) {
        parsedFilters[key] = {
          $in: value,
        };

        continue;
      }

      parsedFilters[key] = value;
    }

    return parsedFilters;
  }
}

export { FilmsService };
