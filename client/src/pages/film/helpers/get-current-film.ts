import { FilmData } from '@/types';

const getCurrentFilm = (list: FilmData[], id: string) => {
  const foundFilm = list.find((film) => film.id === id);

  return foundFilm ?? null;
};

export { getCurrentFilm };
