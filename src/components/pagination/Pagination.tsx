import { FC, useMemo } from 'react';
import styles from './Pagination.module.css';
import { useFilter } from '@/hooks';
import classNames from 'classnames';
import { useFilmsContext } from '@/context';
import { PER_PAGE } from '@/common/constants';

type Props = {
  count: number;
};

const Pagination: FC<Props> = ({ count }) => {
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
        <span>/ {initialFilmsList.length} films</span>
      </div>
    </div>
  );
};

export { Pagination };
