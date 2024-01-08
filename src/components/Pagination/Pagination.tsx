import { FC, useMemo } from 'react';
import classes from './Pagination.module.css';
import { useFilter } from '@/hooks';
import classNames from 'classnames';

type PaginationProps = {
  count: number;
};

const Pagination: FC<PaginationProps> = ({ count }) => {
  const [params, setSearchParams] = useFilter();

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
  );
};

export { Pagination };
