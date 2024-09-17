import { RootFilterQuery } from 'mongoose';
import { FilmsModel } from './films.model';
import { FindAllFilters, FindAllQueries } from './common';

class FilmsService {
  async getFilteredFilms(queries: FindAllQueries) {
    const { limit, skip, ...filters } = queries;

    const parsedFilters = this.#parseFilters(filters);

    const films = await FilmsModel.find(
      parsedFilters,
      { _id: 1, title: 1, media: 1, year: 1, collections: 1, releaseDate: 1 },
      { limit, skip, sort: { 'releaseDate.0': -1 } },
    );

    return films;
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
