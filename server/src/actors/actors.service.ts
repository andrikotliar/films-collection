import { ActorModel } from './actors.model';
import { IActorsService } from './types';

class ActorsService implements IActorsService {
  private actorsModel;

  constructor(actorsModel: typeof ActorModel) {
    this.actorsModel = actorsModel;
  }

  async getActorById(actorId: string) {
    const actor = await this.actorsModel.findById(actorId).lean();

    return actor;
  }
}

export { ActorsService };
