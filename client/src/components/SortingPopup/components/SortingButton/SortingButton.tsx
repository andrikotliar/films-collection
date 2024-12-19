import { ArrowDownUpIcon } from 'lucide-react';
import { forwardRef, PropsWithChildren } from 'react';
import styles from './SortingButton.module.css';

type SortingButtonProps = PropsWithChildren<{
  onClick: VoidFunction;
}>;

export const SortingButton = forwardRef<HTMLButtonElement, SortingButtonProps>(
  ({ onClick, children }, ref) => {
    return (
      <button ref={ref} onClick={onClick} className={styles.sortingButton}>
        <ArrowDownUpIcon size={18} />
        <span className={styles.label}>{children}</span>
      </button>
    );
  },
);
