import { StarIcon } from 'lucide-react';
import styles from './stats.module.css';
import clsx from 'clsx';
import { Link } from '@tanstack/react-router';
import { defineCssProperties } from '~/shared';

type StatsProps = {
  rating: number;
  isMostWatched: boolean;
  isWatchedInCinema: boolean;
};

export const Stats = ({ rating, isMostWatched, isWatchedInCinema }: StatsProps) => {
  return (
    <div className={styles.stats}>
      <Link className={styles.rating} to="/" search={{ rating }}>
        {Array.from({ length: 3 }, (_, index) => (
          <StarIcon
            key={index}
            className={clsx(styles.star, {
              [styles.filled_star]: index <= rating - 1,
            })}
          />
        ))}
      </Link>
      {isMostWatched && (
        <div
          className={styles.badge}
          style={defineCssProperties({
            '--badge-color': 'var(--color-orange-light)',
          })}
        >
          Most watched
        </div>
      )}
      {isWatchedInCinema && (
        <div
          className={styles.badge}
          style={defineCssProperties({
            '--badge-color': 'var(--color-blue-light)',
          })}
        >
          Watched in cinema
        </div>
      )}
    </div>
  );
};
