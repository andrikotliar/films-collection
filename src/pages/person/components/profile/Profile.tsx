import { FC } from 'react';
import styles from './Profile.module.css';
import { RouterLink } from '@/components';
import { buildQueryLink } from '@/helpers';

type Props = {
  filmsCount: number;
  genres: string[];
  years: string[];
};

const Profile: FC<Props> = ({ filmsCount, genres, years }) => {
  return (
    <div className={styles.profile}>
      <div className={styles.row}>
        <h3 className={styles.rowTitle}>Films count</h3>
        <div>{filmsCount}</div>
      </div>
      <div className={styles.row}>
        <h3 className={styles.rowTitle}>Genres</h3>
        <div className={styles.links}>
          {genres.map((genre) => (
            <RouterLink to={buildQueryLink('genres', genre)} key={genre}>
              {genre}
            </RouterLink>
          ))}
        </div>
      </div>
      <div className={styles.row}>
        <h3 className={styles.rowTitle}>Years</h3>
        <div className={styles.links}>
          {years.map((year) => (
            <RouterLink to={buildQueryLink('years', year)} key={year}>
              {year}
            </RouterLink>
          ))}
        </div>
      </div>
    </div>
  );
};

export { Profile };
