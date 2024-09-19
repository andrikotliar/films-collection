import { FC } from 'react';
import { FilmsListItem } from '@/types';
import { FilmLink } from './components';
import styles from './FilmsGrid.module.css';

type FilmsGridProps = {
  films: FilmsListItem[];
};

const FilmsGrid: FC<FilmsGridProps> = ({ films }) => {
  return (
    <div className={styles.grid}>
      {films.map((film) => (
        <FilmLink data={film} key={film._id} />
      ))}
    </div>
  );
};

export { FilmsGrid };
