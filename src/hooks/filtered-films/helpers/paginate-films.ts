import { PER_PAGE } from '@/common/constants';
import { FilmData } from '@/common/types';

const paginateFilms = (films: FilmData[], pageIndex: number) => {
  const sliceStart = PER_PAGE * pageIndex;
  const sliceEnd = PER_PAGE * (pageIndex + 1);

  const paginatedFilms = films.slice(sliceStart, sliceEnd);
  const pagesCount = Math.ceil(films.length / PER_PAGE);

  return {
    paginatedFilms,
    pagesCount,
  };
};

export { paginateFilms };