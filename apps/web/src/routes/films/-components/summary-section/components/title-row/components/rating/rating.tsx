import styles from './styles.module.css';
import { Link } from '@tanstack/react-router';
import classNames from 'classnames';
import { StarIcon } from 'lucide-react';

type Props = {
  value: number;
};

const HIGHEST_RATING_VALUE = 3;

export const Rating = ({ value }: Props) => {
  const isHighestRating = value === HIGHEST_RATING_VALUE;

  return (
    <Link
      to="/"
      search={{ rating: String(value) }}
      className={classNames(styles.rating, {
        [styles.highestRating]: isHighestRating,
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
