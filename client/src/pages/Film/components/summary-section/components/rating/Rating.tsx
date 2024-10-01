import { FC } from 'react';
import styles from './Rating.module.css';
import { TrophyIcon } from 'lucide-react';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import { buildQueryLink } from '@/helpers';

type RatingProps = {
  value: number;
};

const Rating: FC<RatingProps> = ({ value }) => {
  const isHighLevel = value > 1;

  return (
    <Link
      to={buildQueryLink({ rating: value })}
      className={classNames(styles.rating, {
        [styles.highRating]: isHighLevel,
        [styles.lowRating]: !isHighLevel,
      })}
    >
      <TrophyIcon className={styles.trophyIcon} />
      <div className={styles.label}>Rating</div>
      <div className={styles.levels}>
        {Array.from({ length: 3 }, (_, index) => (
          <div
            className={classNames(styles.level, {
              [styles.levelCompleted]: index + 1 <= value,
            })}
            key={index}
          />
        ))}
      </div>
    </Link>
  );
};

export { Rating };
