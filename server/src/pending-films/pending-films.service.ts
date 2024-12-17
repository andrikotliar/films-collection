import { PendingFilmsModel } from './pending-films.model';

export class PendingFilmsService {
  private pendingFilmsModel: typeof PendingFilmsModel;

  constructor(pendingFilmsModel: typeof PendingFilmsModel) {
    this.pendingFilmsModel = pendingFilmsModel;
  }

  getList() {
    return this.pendingFilmsModel.find();
  }
}
