import { Prisma } from '@prisma/client';
import { PendingFilmsRepository } from './pending-films.repository';
import {
  PendingFilmsCreatePayload,
  PendingFilmsQuery,
  PendingFilmsUpdatePayload,
} from 'src/modules/pending-films/schemas';

export class PendingFilmsService {
  constructor(private pendingFilmsRepository: PendingFilmsRepository) {}

  async getList(queryFilters: PendingFilmsQuery) {
    const { filters, options } = this.getListFilters(queryFilters);

    return this.pendingFilmsRepository.getListAndCount({
      ...options,
      where: filters,
    });
  }

  createPendingFilm(payload: PendingFilmsCreatePayload) {
    return this.pendingFilmsRepository.create(payload);
  }

  deletePendingFilm(id: number) {
    return this.pendingFilmsRepository.deleteById(id);
  }

  updatePendingFilm(id: number, payload: PendingFilmsUpdatePayload) {
    return this.pendingFilmsRepository.updateById(id, payload);
  }

  private getListFilters(queryFilters: PendingFilmsQuery) {
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
        limit: 30,
        skip: queryFilters.skip ?? 0,
        orderBy: {
          [sortingKey]: queryFilters.order ?? 'desc',
        },
      },
    };
  }
}
