import { ArrowDownUpIcon } from 'lucide-react';
import { forwardRef, PropsWithChildren } from 'react';
import styles from './SortingButton.module.css';
import classNames from 'classnames';

type SortingButtonProps = PropsWithChildren<{
  onClick: VoidFunction;
  size: 'small' | 'large';
}>;

export const SortingButton = forwardRef<HTMLButtonElement, SortingButtonProps>(
  ({ onClick, children, size }, ref) => {
    return (
      <button
        ref={ref}
        onClick={onClick}
        className={classNames(styles.sortingButton, styles[size])}
      >
        <ArrowDownUpIcon size={18} />
        <span className={styles.label}>{children}</span>
      </button>
    );
  },
);
