import { type FilmsListItem, getYearFromDate, Image } from '~/common';
import styles from './styles.module.css';
import { Link } from '@tanstack/react-router';

type Props = {
  films: FilmsListItem[];
};

export const FilmsGrid = ({ films }: Props) => {
  return (
    <div className={styles.grid}>
      {films.map((film) => (
        <Link
          className={styles.film_link}
          to="/films/$id"
          params={{ id: String(film.id) }}
          key={film.id}
        >
          <div className={styles.cover}>
            <Image src={film.poster} alt={film.title} isExternal />
          </div>
          <h3 className={styles.title}>{film.title}</h3>
          <p className={styles.year}>{getYearFromDate(film.releaseDate)}</p>
        </Link>
      ))}
    </div>
  );
};
