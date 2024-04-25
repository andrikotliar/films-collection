import { ActorsList } from '@/common/types';
import { api } from '@/services';

const fetchActorsList = () =>
  api<ActorsList>({
    url: '/database/actors.json',
  });

export { fetchActorsList };
