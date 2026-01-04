import { Link } from '@tanstack/react-router';
import { EyeIcon, StarIcon } from 'lucide-react';
import styles from './stats.module.css';
import clsx from 'clsx';

type StatsProps = {
  watchCount: number;
  rating: number;
};

const MAX_RATING_VALUE = 3;

export const Stats = ({ watchCount, rating }: StatsProps) => {
  return (
    <div className={styles.stats}>
      <Link
        to="/"
        search={{ rating }}
        className={clsx(styles.stats_item, styles.stats_item_rating)}
      >
        <StarIcon />
        <span className={styles.stats_item_label}>Rating</span>
        <span className={styles.stats_item_value}>
          {rating} / {MAX_RATING_VALUE}
        </span>
      </Link>
      <Link
        to="/"
        search={{ watchCount }}
        className={clsx(styles.stats_item, styles.stats_item_watch_count)}
      >
        <EyeIcon />
        <span className={styles.stats_item_label}>Watched times</span>
        <span className={styles.stats_item_value}>{watchCount}</span>
      </Link>
    </div>
  );
};
