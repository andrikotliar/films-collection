import styles from './Pagination.module.css';
import { FC, useMemo } from 'react';
import classNames from 'classnames';
import { PER_PAGE } from '@/constants';
import { getRouteApi } from '@tanstack/react-router';

export type PaginationProps = {
  total: number;
};

const routeApi = getRouteApi('/');

export const Pagination: FC<PaginationProps> = ({ total }) => {
  const navigate = routeApi.useNavigate();
  const routeSearch = routeApi.useSearch();

  const activePage = useMemo(() => {
    if (!routeSearch.skip) {
      return 0;
    }

    return Number(routeSearch.skip);
  }, [routeSearch]);

  const pagesCount = Math.ceil(total / PER_PAGE);

  const handlePage = (pageIndex: number) => () => {
    navigate({
      to: '/',
      search: (prev) => ({
        ...prev,
        skip: pageIndex,
      }),
    });
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <div className={styles.pagination}>
      {pagesCount > 1 && (
        <div className={styles.pages}>
          {Array.from({ length: Math.ceil(total / PER_PAGE) }, (_, index) => (
            <button
              className={classNames(styles.pageButton, {
                [styles.active]: activePage === index,
              })}
              key={index}
              onClick={handlePage(index)}
            >
              {index + 1}
            </button>
          ))}
        </div>
      )}
      <div className={styles.stats}>
        <span className={styles.currentState}>
          {activePage * PER_PAGE + 1} - {(activePage + 1) * PER_PAGE}
        </span>{' '}
        <span>/ {total} films</span>
      </div>
    </div>
  );
};
