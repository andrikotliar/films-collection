import { ArrowDownAZIcon, ArrowUpAZIcon } from 'lucide-react';
import { forwardRef, type ReactNode } from 'react';
import styles from './sorting-button.module.css';
import classNames from 'classnames';
import { type SortingOrder } from '@/common';

type SortingButtonProps = {
  onClick: VoidFunction;
  order: SortingOrder;
  size: 'small' | 'large';
  children?: ReactNode;
};

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
