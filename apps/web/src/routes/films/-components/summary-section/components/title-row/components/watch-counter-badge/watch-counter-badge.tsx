import type { WatchCounter } from '~/shared';
import { EyeIcon } from 'lucide-react';
import styles from './styles.module.css';

type Props = {
  counters: WatchCounter;
};

export const WatchCounterBadge = ({ counters }: Props) => {
  return (
    <div
      title={`Accurate watch counter: ${counters.realCounter}. ${
        counters.approxCounter > 0 && `Approximate watch counter: >${counters.approxCounter}`
      }`}
      className={styles.watch_counter_badge}
    >
      <EyeIcon />
      {counters.realCounter > 0 && (
        <div className={styles.counters}>
          <span>{counters.realCounter}</span>
          {counters.approxCounter > 0 && (
            <span>
              ({'>'}
              {counters.approxCounter})
            </span>
          )}
        </div>
      )}
    </div>
  );
};
