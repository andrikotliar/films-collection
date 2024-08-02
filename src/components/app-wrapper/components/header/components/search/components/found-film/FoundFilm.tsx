import { FC } from 'react';
import { Link } from 'react-router-dom';
import { FilmData } from '@/common/types';
import { buildMediaPath } from '@/helpers';
import styles from './FoundFilm.module.css';

type FoundFilmProps = {
  film: FilmData;
  onFilmOpen: VoidFunction;
};

const FoundFilm: FC<FoundFilmProps> = ({ film, onFilmOpen }) => {
  return (
    <Link
      to={`/film/${film.id}`}
      className={styles.film}
      onClick={onFilmOpen}
      type="button"
    >
      <div className={styles.posterContainer}>
        <img
          src={buildMediaPath('posters', film.media[0].poster)}
          alt=""
          className={styles.poster}
        />
      </div>
      <div className={styles.info}>
        <h3 className={styles.title}>{film.title}</h3>
        <p className={styles.description}>{film.description[0]}</p>
        <div className={styles.year}>{film.year[0]}</div>
      </div>
    </Link>
  );
};

export { FoundFilm };
