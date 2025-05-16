import styles from './Pagination.module.css';
import { FC } from 'react';
import classNames from 'classnames';

export type PaginationProps = {
  currentPageIndex?: number;
  total: number;
  onPageChange: (pageIndex: number) => void;
  perPageCounter: number;
  totalLabel?: string;
};

export const Pagination: FC<PaginationProps> = ({
  total,
  onPageChange,
  currentPageIndex = 0,
  perPageCounter,
  totalLabel = 'items',
}) => {
  const pagesCount = Math.ceil(total / perPageCounter);
  const currentRangeEnd =
    total >= perPageCounter ? (currentPageIndex + 1) * perPageCounter : total;

  return (
    <div className={styles.pagination}>
      {pagesCount > 1 && (
        <div className={styles.pages}>
          {Array.from(
            { length: Math.ceil(total / perPageCounter) },
            (_, index) => (
              <button
                className={classNames(styles.pageButton, {
                  [styles.active]: currentPageIndex === index,
                })}
                key={index}
                onClick={() => onPageChange(index)}
              >
                {index + 1}
              </button>
            ),
          )}
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
