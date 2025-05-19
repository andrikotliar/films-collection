import { FC } from 'react';
import { FilmsListItem } from '@/types';
import { FilmLink } from './components';
import styles from './films-grid.module.css';

type FilmsGridProps = {
  films: FilmsListItem[];
};

export const FilmsGrid: FC<FilmsGridProps> = ({ films }) => {
  return (
    <div className={styles.grid}>
      {films.map((film) => (
        <FilmLink data={film} key={film.id} />
      ))}
    </div>
  );
};
