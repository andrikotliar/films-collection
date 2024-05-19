import { api } from '@/services';
import { ActorsList, FilmData } from '@/common/types';

type DataCollection = {
  films: FilmData[];
  actors: ActorsList;
};

const fetchData = () =>
  api<DataCollection>({
    url: '/dataset/dataset.json',
  });

export { fetchData, type DataCollection };
