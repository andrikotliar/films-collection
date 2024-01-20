import { FC, useMemo } from 'react';
import classes from './Pagination.module.css';
import { useFilter } from '@/hooks';
import classNames from 'classnames';
import { useFilmsContext } from '@/context';
import { PER_PAGE } from '@/common';

type PaginationProps = {
  count: number;
};

const Pagination: FC<PaginationProps> = ({ count }) => {
  const [params, setSearchParams] = useFilter();
  const { initialFilmsList } = useFilmsContext();

  const activePage = useMemo(() => {
    if (!params.pageIndex) {
      return 0;
    }

    return Number(params.pageIndex);
  }, [params]);

  const handlePage = (pageIndex: number) => () => {
    setSearchParams({
      ...params,
      pageIndex,
    });
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <div className={classes.pagination}>
      <div className={classes.pages}>
        {Array.from({ length: count }, (_, index) => (
          <button
            className={classNames(classes.pageButton, {
              [classes.active]: activePage === index,
            })}
            key={index}
            onClick={handlePage(index)}
          >
            {index + 1}
          </button>
        ))}
      </div>
      <div className={classes.stats}>
        <span className={classes.currentState}>
          {activePage * PER_PAGE + 1} - {(activePage + 1) * PER_PAGE}
        </span>{' '}
        <span>/ {initialFilmsList.length} films</span>
      </div>
    </div>
  );
};

export { Pagination };
