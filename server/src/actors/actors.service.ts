import { ActorModel } from './actors.model';

class ActorsService {
  getActorById(actorId: string) {
    const actor = ActorModel.findById(actorId);

    return actor;
  }
}

export { ActorsService };
