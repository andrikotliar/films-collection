import styles from './Pagination.module.css';
import { FC } from 'react';
import classNames from 'classnames';
import { PER_PAGE } from '@/constants';

export type PaginationProps = {
  currentPageIndex?: number;
  total: number;
  onPageChange: (pageIndex: number) => void;
};

export const Pagination: FC<PaginationProps> = ({
  total,
  onPageChange,
  currentPageIndex = 0,
}) => {
  const pagesCount = Math.ceil(total / PER_PAGE);

  return (
    <div className={styles.pagination}>
      {pagesCount > 1 && (
        <div className={styles.pages}>
          {Array.from({ length: Math.ceil(total / PER_PAGE) }, (_, index) => (
            <button
              className={classNames(styles.pageButton, {
                [styles.active]: currentPageIndex === index,
              })}
              key={index}
              onClick={() => onPageChange(index)}
            >
              {index + 1}
            </button>
          ))}
        </div>
      )}
      <div className={styles.stats}>
        <span className={styles.currentState}>
          {currentPageIndex * PER_PAGE + 1} -{' '}
          {(currentPageIndex + 1) * PER_PAGE}
        </span>{' '}
        <span>/ {total} films</span>
      </div>
    </div>
  );
};
