import styles from './styles.module.css';
import { useMemo } from 'react';
import classNames from 'classnames';
import { buildPagination } from '~/common';

export type PaginationProps = {
  currentPageIndex?: number;
  total: number;
  onPageChange: (pageIndex: number) => void;
  perPageCounter: number;
  totalLabel?: string;
};

export const Pagination = ({
  total,
  onPageChange,
  currentPageIndex = 0,
  perPageCounter,
  totalLabel = 'items',
}: PaginationProps) => {
  const pagesCount = Math.ceil(total / perPageCounter);
  const currentRangeEnd = total >= perPageCounter ? (currentPageIndex + 1) * perPageCounter : total;

  const pages = useMemo(() => {
    return buildPagination(currentPageIndex + 1, Math.round(total / perPageCounter));
  }, [total, currentPageIndex, perPageCounter]);

  return (
    <div className={styles.pagination}>
      {pagesCount > 1 && (
        <div className={styles.pages}>
          {pages.map((page, index) => {
            if (typeof page === 'string') {
              return (
                <div className={styles.dots} key={index}>
                  {page}
                </div>
              );
            }

            return (
              <button
                className={classNames(styles.pageButton, {
                  [styles.active]: currentPageIndex + 1 === page,
                })}
                key={index}
                onClick={() => onPageChange(page - 1)}
              >
                {page}
              </button>
            );
          })}
        </div>
      )}
      {total > 0 && (
        <div className={styles.stats}>
          <span className={styles.currentState}>
            {currentPageIndex * perPageCounter + 1} - {currentRangeEnd}
          </span>
          <span>/</span>
          <span>
            {total} {totalLabel}
          </span>
        </div>
      )}
    </div>
  );
};
