import { PendingFilmsModel } from './pending-films.model';
import { IPendingFilmsService, PendingFilmEntity } from './types';

export class PendingFilmsService implements IPendingFilmsService {
  private pendingFilmsModel: typeof PendingFilmsModel;

  constructor(pendingFilmsModel: typeof PendingFilmsModel) {
    this.pendingFilmsModel = pendingFilmsModel;
  }

  getList() {
    return this.pendingFilmsModel.find();
  }

  createPendingFilm(film: Pick<PendingFilmEntity, 'title' | 'priority'>) {
    const pendingFilm = new this.pendingFilmsModel(film);

    return pendingFilm.save();
  }
}
