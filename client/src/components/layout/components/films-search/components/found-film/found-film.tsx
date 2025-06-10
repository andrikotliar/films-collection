import { Link } from '@tanstack/react-router';
import { FilmSearchResult } from '@/types';
import { getYearFromDate } from '@/helpers';
import styles from './found-film.module.css';
import { Image } from '@/components/image/image';

type FoundFilmProps = {
  film: FilmSearchResult;
  onFilmOpen: VoidFunction;
};

export const FoundFilm = ({ film, onFilmOpen }: FoundFilmProps) => {
  const genres = film.genres.map((genre) => genre.genre.title).join(', ');

  return (
    <Link
      to={`/film/${film.id}`}
      className={styles.film}
      onClick={onFilmOpen}
      type="button"
    >
      <div className={styles.posterContainer}>
        <Image
          src={film.poster}
          alt={`Poster of the "${film.title}"`}
          className={styles.poster}
          isExternal
        />
      </div>
      <div className={styles.info}>
        <h3 className={styles.title}>{film.title}</h3>
        <p className={styles.genres}>{genres}</p>
        <div className={styles.year}>{getYearFromDate(film.releaseDate)}</div>
      </div>
    </Link>
  );
};
