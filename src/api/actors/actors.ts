import { ActorsList } from '@/common/types';
import { api } from '@/services';

const getActorsList = () =>
  api<ActorsList>({
    url: '/database/actors.json',
  });

export { getActorsList };
