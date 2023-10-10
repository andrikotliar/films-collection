import { FILMS_PER_PAGE } from '@/constants';
import { FilmData } from '@/types';

export const sliceFilmsByPage = (
  films: FilmData[],
  currentPage: number,
  perPage = FILMS_PER_PAGE,
) => {
  const from = currentPage * perPage - perPage;
  const to = currentPage * perPage;
  return {
    list: films.slice(from, to),
    from,
    to,
  };
};
