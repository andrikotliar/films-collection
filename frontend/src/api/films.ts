import { api } from '@/services';
import { FilmData } from '@/common';

const fetchAllFilms = async () => {
  const response = await api.get<FilmData[]>('/database/database.json');
  return response.data;
};

const fetchFilmIds = async () => {
  const response = await api.get<string[]>('/database/film-ids.json');
  return response.data;
};

export { fetchAllFilms, fetchFilmIds };
