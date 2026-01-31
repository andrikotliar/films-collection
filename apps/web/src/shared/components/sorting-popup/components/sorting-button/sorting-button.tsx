import { ArrowDownAZIcon, ArrowUpAZIcon } from 'lucide-react';
import { forwardRef } from 'react';
import styles from './sorting-button.module.css';
import clsx from 'clsx';
import type { SortingOrder } from '@films-collection/shared';

type SortingButtonProps = {
  onClick: VoidFunction;
  order: SortingOrder;
  size: 'small' | 'large';
  children?: React.ReactNode;
};

export const SortingButton = forwardRef<HTMLButtonElement, SortingButtonProps>(
  ({ onClick, children, size, order }, ref) => {
    return (
      <button ref={ref} onClick={onClick} className={clsx(styles.sorting_button, styles[size])}>
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
