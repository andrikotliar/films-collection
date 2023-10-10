import classes from './Pagination.module.css';
import { useFilmsContext } from '@/context/FilmsContext';
import { FILMS_PER_PAGE } from '@/common/constants';
import { Button } from '@/components';

const Pagination = () => {
  const { getCurrentPage, filmsCount, setPage } =
    useFilmsContext();

  if (filmsCount <= FILMS_PER_PAGE) {
    return null;
  }

  const pagesList = (filmsCount: number) => {
    const pageNumbers: number[] = [];
    const pagesCount = filmsCount / FILMS_PER_PAGE;

    for (let i = 0; i <= pagesCount; i++) {
      pageNumbers.push(i + 1);
    }

    return pageNumbers;
  };

  return (
    <div className={classes.pagination}>
      {pagesList(filmsCount).map(pageNumber => (
        <Button
          isActive={pageNumber === getCurrentPage()}
          key={pageNumber}
          onClick={() => setPage(pageNumber)}
          design={
            pageNumber === getCurrentPage()
              ? 'primary'
              : 'ghost'
          }
          className={classes.button}
        >
          {pageNumber}
        </Button>
      ))}
    </div>
  );
};

export { Pagination };
