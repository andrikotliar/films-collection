import { FC, useMemo } from 'react';
import styles from './Pagination.module.css';
import { useQueryFilter } from '@/hooks';
import classNames from 'classnames';
import { useFilmsContext } from '@/context';
import { PER_PAGE } from '@/common/constants';

type Props = {
  count: number;
};

const Pagination: FC<Props> = ({ count }) => {
  const { filterParams, setSearchParams } = useQueryFilter();
  const { films } = useFilmsContext();

  const activePage = useMemo(() => {
    if (!filterParams.pageIndex) {
      return 0;
    }

    return Number(filterParams.pageIndex);
  }, [filterParams]);

  const handlePage = (pageIndex: number) => () => {
    setSearchParams({
      ...filterParams,
      pageIndex,
    });
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <div className={styles.pagination}>
      <div className={styles.pages}>
        {Array.from({ length: count }, (_, index) => (
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
        <span>/ {films?.length ?? 0} films</span>
      </div>
    </div>
  );
};

export { Pagination };