import { FILMS_PER_PAGE } from '@/common/constants';

const getPagination = (
  currentPage: number,
  filmsCount: number,
) => {
  const lastPage = Math.ceil(filmsCount / FILMS_PER_PAGE);
  const left = currentPage - 1;
  const right = currentPage + 1;
  const range = [];

  for (let i = 1; i <= lastPage; i++) {
    if (
      i == 1 ||
      i == lastPage ||
      (i >= left && i <= right)
    ) {
      range.push(i);
    }
  }

  return range;
};

export { getPagination };
