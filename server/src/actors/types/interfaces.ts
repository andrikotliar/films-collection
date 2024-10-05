import { ActorType } from './actor';

interface IActorsService {
  getActorById(actorId: string): Promise<ActorType | null>;
}

export { IActorsService };
