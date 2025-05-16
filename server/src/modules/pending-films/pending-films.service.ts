import { Prisma } from '@prisma/client';
import { PendingFilmsRepository } from './pending-films.repository';
import {
  CreatePendingFilmPayload,
  GetPendingFilmsListQuery,
  UpdatePendingFilmPayload,
} from './schemas';

export class PendingFilmsService {
  constructor(private pendingFilmsRepository: PendingFilmsRepository) {}

  async getList(queryFilters: GetPendingFilmsListQuery) {
    const { filters, options } = this.getListFilters(queryFilters);

    return this.pendingFilmsRepository.getListAndCount({
      ...options,
      where: filters,
    });
  }

  createPendingFilm(payload: CreatePendingFilmPayload) {
    return this.pendingFilmsRepository.create(payload);
  }

  deletePendingFilm(id: number) {
    return this.pendingFilmsRepository.deleteById(id);
  }

  updatePendingFilm(id: number, payload: UpdatePendingFilmPayload) {
    return this.pendingFilmsRepository.updateById(id, payload);
  }

  private getListFilters(queryFilters: GetPendingFilmsListQuery) {
    const filters: Prisma.PendingFilmWhereInput = {};

    if (queryFilters.q) {
      filters.title = {
        contains: queryFilters.q,
        mode: 'insensitive',
      };
    }

    if (queryFilters.priorities?.length) {
      filters.priority = {
        in: queryFilters.priorities,
      };
    }

    const sortingKey = queryFilters.orderKey ?? 'createdAt';

    return {
      filters,
      options: {
        take: 30,
        skip: queryFilters.skip ?? 0,
        orderBy: {
          [sortingKey]: queryFilters.order ?? 'desc',
        },
      },
    };
  }
}
