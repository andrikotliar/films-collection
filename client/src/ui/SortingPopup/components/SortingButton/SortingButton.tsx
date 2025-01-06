import {
  ArrowDownAZIcon,
  ArrowDownNarrowWide,
  ArrowDownUpIcon,
  ArrowUpAZIcon,
  ArrowUpNarrowWide,
} from 'lucide-react';
import { forwardRef, PropsWithChildren } from 'react';
import styles from './SortingButton.module.css';
import classNames from 'classnames';
import { SortingDirection } from '@/types';

type SortingButtonProps = PropsWithChildren<{
  onClick: VoidFunction;
  sortingDirection: SortingDirection;
  size: 'small' | 'large';
}>;

export const SortingButton = forwardRef<HTMLButtonElement, SortingButtonProps>(
  ({ onClick, children, size, sortingDirection }, ref) => {
    return (
      <button
        ref={ref}
        onClick={onClick}
        className={classNames(styles.sortingButton, styles[size])}
      >
        <span className={styles.label}>{children}</span>
        {sortingDirection === 'asc' ? (
          <ArrowDownAZIcon className={styles.icon} />
        ) : (
          <ArrowUpAZIcon className={styles.icon} />
        )}
      </button>
    );
  },
);
