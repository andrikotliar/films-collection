import styles from './rating.module.css';
import { Link } from '@tanstack/react-router';
import clsx from 'clsx';
import { StarIcon } from 'lucide-react';

type RatingProps = {
  value: number;
};

const HIGHEST_RATING_VALUE = 3;

export const Rating = ({ value }: RatingProps) => {
  const isHighestRating = value === HIGHEST_RATING_VALUE;

  return (
    <Link
      to="/"
      search={{ rating: value }}
      className={clsx(styles.rating, {
        [styles.highest_rating]: isHighestRating,
      })}
      title="Rating"
    >
      <div className={styles.icon}>
        <StarIcon />
      </div>
      <span className={styles.value}>
        {value} / {HIGHEST_RATING_VALUE}
      </span>
    </Link>
  );
};
