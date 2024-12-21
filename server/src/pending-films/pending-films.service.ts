import { PendingFilmsModel } from './pending-films.model';
import {
  GetListQuery,
  PendingFilmEntity,
  PendingFilmsFilter,
  UpdatePendingFilmPayload,
} from './types';

export class PendingFilmsService {
  private pendingFilmsModel: typeof PendingFilmsModel;

  constructor(pendingFilmsModel: typeof PendingFilmsModel) {
    this.pendingFilmsModel = pendingFilmsModel;
  }

  async getList(queryFilters: GetListQuery) {
    const { filters, options } = this.getListFilters(queryFilters);

    const list = await this.pendingFilmsModel.find(filters, null, options);
    const total = await this.pendingFilmsModel.countDocuments(filters);

    return { list, total };
  }

  createPendingFilm(film: Pick<PendingFilmEntity, 'title' | 'priority'>) {
    const pendingFilm = new this.pendingFilmsModel(film);

    return pendingFilm.save();
  }

  deletePendingFilm(filmId: string) {
    return this.pendingFilmsModel.deleteOne({
      _id: filmId,
    });
  }

  updatePendingFilm(filmId: string, payload: UpdatePendingFilmPayload) {
    return this.pendingFilmsModel.findOneAndUpdate(
      {
        _id: filmId,
      },
      payload,
      {
        new: true,
      },
    );
  }

  private getListFilters(queryFilters: GetListQuery) {
    const filters: PendingFilmsFilter = {};

    if (queryFilters.q) {
      filters.title = {
        $regex: queryFilters.q,
        $options: 'i',
      };
    }

    if (queryFilters.priority) {
      filters.priority = queryFilters.priority;
    }

    const sortingKey = queryFilters.sortingField ?? 'createdAt';

    return {
      filters,
      options: {
        limit: 30,
        skip: queryFilters.skip ?? 0,
        sort: {
          [sortingKey]: queryFilters.sortingDirection ?? 'desc',
        },
      },
    };
  }
}
