import { FC, useMemo } from 'react';
import styles from './Pagination.module.css';
import { useQueryFilter } from '@/hooks';
import classNames from 'classnames';
import { PER_PAGE } from '@/constants';

type PaginationProps = {
  total: number;
};

const Pagination: FC<PaginationProps> = ({ total }) => {
  const { filterParams, setSearchParams } = useQueryFilter();

  const activePage = useMemo(() => {
    if (!filterParams.skip) {
      return 0;
    }

    return Number(filterParams.skip);
  }, [filterParams]);

  const pagesCount = Math.ceil(total / PER_PAGE);

  if (!pagesCount) {
    return;
  }

  const handlePage = (pageIndex: number) => () => {
    setSearchParams({
      ...filterParams,
      skip: pageIndex,
    });
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <div className={styles.pagination}>
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
      <div className={styles.stats}>
        <span className={styles.currentState}>
          {activePage * PER_PAGE + 1} - {(activePage + 1) * PER_PAGE}
        </span>{' '}
        <span>/ {total} films</span>
      </div>
    </div>
  );
};

export { Pagination, type PaginationProps };
