import { ArrowDownAZIcon, ArrowUpAZIcon } from 'lucide-react';
import { forwardRef, PropsWithChildren } from 'react';
import styles from './SortingButton.module.css';
import classNames from 'classnames';
import { SortingOrder } from '@/types';

type SortingButtonProps = PropsWithChildren<{
  onClick: VoidFunction;
  order: SortingOrder;
  size: 'small' | 'large';
}>;

export const SortingButton = forwardRef<HTMLButtonElement, SortingButtonProps>(
  ({ onClick, children, size, order }, ref) => {
    return (
      <button
        ref={ref}
        onClick={onClick}
        className={classNames(styles.sortingButton, styles[size])}
      >
        <span className={styles.label}>{children}</span>
        {order === 'asc' ? (
          <ArrowDownAZIcon className={styles.icon} />
        ) : (
          <ArrowUpAZIcon className={styles.icon} />
        )}
      </button>
    );
  },
);
