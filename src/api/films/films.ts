import { api } from '@/services';
import { FilmData, Related } from '@/common/types';

const fetchAllFilms = () =>
  api<FilmData[]>({
    url: '/database/database.json',
  });

const fetchRelatedFilmsList = () =>
  api<Related>({
    url: '/database/related.json',
  });

export { fetchAllFilms, fetchRelatedFilmsList };
