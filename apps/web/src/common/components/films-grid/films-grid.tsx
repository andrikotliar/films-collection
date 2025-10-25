import { type FilmsListItem } from '~/common';
import { FilmLink } from './components';
import styles from './styles.module.css';

type Props = {
  films: FilmsListItem[];
};

export const FilmsGrid = ({ films }: Props) => {
  return (
    <div className={styles.grid}>
      {films.map((film) => (
        <FilmLink data={film} key={film.id} />
      ))}
    </div>
  );
};
