import { Prisma } from '@prisma/client';
import {
  CreatePendingFilmInput,
  GetListQuery,
  UpdatePendingFilmInput,
} from './types';
import { PendingFilmsRepository } from './pending-films.repository';

export class PendingFilmsService {
  constructor(private pendingFilmsRepository: PendingFilmsRepository) {}

  async getList(queryFilters: GetListQuery) {
    const { filters, options } = this.getListFilters(queryFilters);

    return this.pendingFilmsRepository.getListAndCount({
      ...options,
      where: filters,
    });
  }

  createPendingFilm(pendingFilmInput: CreatePendingFilmInput) {
    return this.pendingFilmsRepository.create(pendingFilmInput);
  }

  deletePendingFilm(id: number) {
    return this.pendingFilmsRepository.deleteById(id);
  }

  updatePendingFilm(id: number, data: UpdatePendingFilmInput) {
    return this.pendingFilmsRepository.updateById(id, data);
  }

  private getListFilters(queryFilters: GetListQuery) {
    const filters: Prisma.PendingFilmWhereInput = {};

    if (queryFilters.q) {
      filters.title = {
        contains: queryFilters.q,
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
          [sortingKey]: queryFilters.orderKey ?? 'desc',
        },
      },
    };
  }
}
