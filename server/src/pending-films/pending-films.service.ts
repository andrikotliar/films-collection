import { PendingFilmsModel } from './pending-films.model';
import { IPendingFilmsService } from './types';

export class PendingFilmsService implements IPendingFilmsService {
  private pendingFilmsModel: typeof PendingFilmsModel;

  constructor(pendingFilmsModel: typeof PendingFilmsModel) {
    this.pendingFilmsModel = pendingFilmsModel;
  }

  getList() {
    return this.pendingFilmsModel.find();
  }
}
