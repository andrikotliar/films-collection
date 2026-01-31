import { getYearFromDate, Image, type api, type ApiResponse } from '~/shared';
import styles from './films-grid.module.css';
import { Link } from '@tanstack/react-router';

type FilmsGridProps = {
  films: ApiResponse<typeof api.films.list>['films'];
};

export const FilmsGrid = ({ films }: FilmsGridProps) => {
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
            <Image src={film.poster} alt={film.title} />
          </div>
          <h3 className={styles.title}>{film.title}</h3>
          <p className={styles.year}>{getYearFromDate(film.releaseDate)}</p>
        </Link>
      ))}
    </div>
  );
};
