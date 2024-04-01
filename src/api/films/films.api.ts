import { api } from '@/services';
import { FilmData, Related } from '@/common/types';

const fetchAllFilms = () =>
  api<FilmData[]>({
    url: '/database/database.json',
  });

const fetchFilmIds = () =>
  api<string[]>({
    url: '/database/film-ids.json',
  });

const fetchRelatedFilmsList = () =>
  api<Related>({
    url: '/database/related.json',
  });

export { fetchAllFilms, fetchFilmIds, fetchRelatedFilmsList };
