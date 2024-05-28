import { api } from '@/services';
import { ActorsList, FilmData } from '@/common/types';

type DataCollection = {
  films: FilmData[];
  actors: ActorsList;
};

const fetchData = () =>
  api<DataCollection>({
    url: '/database/database.json',
  });

export { fetchData, type DataCollection };
