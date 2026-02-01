import { StarIcon } from 'lucide-react';
import styles from './stats.module.css';
import clsx from 'clsx';
import { Link } from '@tanstack/react-router';

type StatsProps = {
  rating: number;
};

export const Stats = ({ rating }: StatsProps) => {
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
    </div>
  );
};
