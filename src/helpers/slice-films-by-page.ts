import { FILMS_PER_PAGE } from '@/common/constants';
import { FilmData } from '@/common';

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
