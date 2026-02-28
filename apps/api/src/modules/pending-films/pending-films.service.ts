import {
  type CreatePendingFilmInput,
  type GetPendingFilmsListQuery,
  type UpdatePendingFilmInput,
} from '@films-collection/shared';
import { throwIfNotFound, type Deps } from '~/shared';

export class PendingFilmsService {
  constructor(private readonly deps: Deps<'pendingFilmsRepository'>) {}

  async getList(queryFilters: GetPendingFilmsListQuery) {
    return this.deps.pendingFilmsRepository.getListAndCount(queryFilters);
  }

  createPendingFilm(input: CreatePendingFilmInput) {
    return throwIfNotFound(this.deps.pendingFilmsRepository.create(input));
  }

  deletePendingFilm(id: number) {
    return this.deps.pendingFilmsRepository.deleteById(id);
  }

  updatePendingFilm(id: number, input: UpdatePendingFilmInput) {
    return throwIfNotFound(this.deps.pendingFilmsRepository.updateById(id, input));
  }

  getPendingFilmById(id: number) {
    return throwIfNotFound(this.deps.pendingFilmsRepository.findPendingFilm(id));
  }
}
