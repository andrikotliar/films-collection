import { ArrowDownAZIcon, ArrowUpAZIcon } from 'lucide-react';
import { forwardRef, type PropsWithChildren } from 'react';
import styles from './styles.module.css';
import classNames from 'classnames';
import { type SortingOrder } from '~/common';

type Props = {
  onClick: VoidFunction;
  order: SortingOrder;
  size: 'small' | 'large';
};

export const SortingButton = forwardRef<HTMLButtonElement, PropsWithChildren<Props>>(
  ({ onClick, children, size, order }, ref) => {
    return (
      <button
        ref={ref}
        onClick={onClick}
        className={classNames(styles.sorting_button, styles[size])}
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
