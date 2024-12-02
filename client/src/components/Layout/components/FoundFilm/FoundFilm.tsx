import { FC } from 'react';
import { Link } from '@tanstack/react-router';
import { FilmSearchResult } from '@/types';
import { buildMediaPath, getYearFromDate } from '@/helpers';
import styles from './FoundFilm.module.css';
import { Image } from '@/components/Image/Image';

type FoundFilmProps = {
  film: FilmSearchResult;
  onFilmOpen: VoidFunction;
};

const FoundFilm: FC<FoundFilmProps> = ({ film, onFilmOpen }) => {
  return (
    <Link
      to={`/film/${film._id}`}
      className={styles.film}
      onClick={onFilmOpen}
      type="button"
    >
      <div className={styles.posterContainer}>
        <Image
          src={buildMediaPath(film.poster)}
          alt={`Poster of the "${film.title}"`}
          className={styles.poster}
        />
      </div>
      <div className={styles.info}>
        <h3 className={styles.title}>{film.title}</h3>
        <p className={styles.genres}>{film.genres.join(', ')}</p>
        <div className={styles.year}>{getYearFromDate(film.releaseDate)}</div>
      </div>
    </Link>
  );
};

export { FoundFilm };
