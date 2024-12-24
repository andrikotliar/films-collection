import {
  ArrowDownNarrowWide,
  ArrowDownUpIcon,
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
        {sortingDirection === 'asc' ? (
          <ArrowDownNarrowWide size={18} />
        ) : (
          <ArrowUpNarrowWide size={18} />
        )}
        <span className={styles.label}>{children}</span>
      </button>
    );
  },
);
