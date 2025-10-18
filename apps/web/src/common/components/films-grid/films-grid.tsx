import { FilmsListItem } from '@/common';
import { FilmLink } from './components';
import styles from './films-grid.module.css';

type FilmsGridProps = {
  films: FilmsListItem[];
};

export const FilmsGrid = ({ films }: FilmsGridProps) => {
  return (
    <div className={styles.grid}>
      {films.map((film) => (
        <FilmLink data={film} key={film.id} />
      ))}
    </div>
  );
};
