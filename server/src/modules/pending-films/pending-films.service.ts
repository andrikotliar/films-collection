import { Prisma } from '@prisma/client';
import { PendingFilmsRepository } from './pending-films.repository';
import {
  CreatePendingFilmInput,
  GetPendingFilmsListQuery,
  UpdatePendingFilmInput,
} from './schemas';
import { DEFAULT_PAGINATION_LIMIT } from 'src/common';

export class PendingFilmsService {
  constructor(private pendingFilmsRepository: PendingFilmsRepository) {}

  async getList(queryFilters: GetPendingFilmsListQuery) {
    const { filters, options } = this.getListFilters(queryFilters);

    return this.pendingFilmsRepository.getListAndCount({
      ...options,
      where: filters,
    });
  }

  createPendingFilm(input: CreatePendingFilmInput) {
    return this.pendingFilmsRepository.create(input);
  }

  deletePendingFilm(id: number) {
    return this.pendingFilmsRepository.deleteById(id);
  }

  updatePendingFilm(id: number, input: UpdatePendingFilmInput) {
    return this.pendingFilmsRepository.updateById(id, input);
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
        take: DEFAULT_PAGINATION_LIMIT,
        skip: queryFilters.skip ?? 0,
        orderBy: {
          [sortingKey]: queryFilters.order ?? 'desc',
        },
      },
    };
  }
}
