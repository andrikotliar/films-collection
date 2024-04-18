import { FC } from 'react';
import styles from './Profile.module.css';
import { SimpleRow } from '../simple-row/SimpleRow';
import { FiltersRow } from '../filters-row/FiltersRow';

type Props = {
  filmsCount: number;
  genres: string[];
  years: string[];
};

const Profile: FC<Props> = ({ filmsCount, genres, years }) => {
  return (
    <div className={styles.profile}>
      <SimpleRow title="Total films count" value={filmsCount} />
      <FiltersRow title="Genres" values={genres} propName="genres" />
      <FiltersRow title="Years" values={years} propName="year" />
    </div>
  );
};

export { Profile };
