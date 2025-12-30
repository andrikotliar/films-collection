import { EyeIcon } from 'lucide-react';
import styles from './watch-counter-badge.module.css';

type WatchCounterBadgeProps = {
  realCounter: number;
  approxCounter: number;
};

export const WatchCounterBadge = ({ realCounter, approxCounter }: WatchCounterBadgeProps) => {
  return (
    <div
      title={`Accurate watch counter: ${realCounter}. ${
        approxCounter > 0 && `Approximate watch counter: >${approxCounter}`
      }`}
      className={styles.watch_counter_badge}
    >
      <EyeIcon />
      {realCounter > 0 && (
        <div className={styles.counters}>
          <span>{realCounter}</span>
          {approxCounter > 0 && (
            <span>
              ({'>'}
              {approxCounter})
            </span>
          )}
        </div>
      )}
    </div>
  );
};
