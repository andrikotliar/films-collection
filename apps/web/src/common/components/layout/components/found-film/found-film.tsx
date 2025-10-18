import styles from './styles.module.css';
import { Link } from '@tanstack/react-router';
import { type FilmSearchResult, getYearFromDate } from '~/common';
import { Image } from '~/common/components/image/image';

type FoundFilmProps = {
  film: FilmSearchResult;
  onFilmOpen: VoidFunction;
};

export const FoundFilm = ({ film, onFilmOpen }: FoundFilmProps) => {
  const genres = film.genres.map((genre) => genre.genre.title).join(', ');

  return (
    <Link
      to="/film/$id"
      params={{
        id: film.id.toString(),
      }}
      className={styles.film_link}
      onClick={onFilmOpen}
    >
      <div className={styles.poster_wrapper}>
        <Image
          src={film.poster}
          alt={`Poster of the "${film.title}"`}
          className={styles.poster_image}
          isExternal
        />
      </div>
      <div className={styles.info_wrapper}>
        <h3 className={styles.film_title}>{film.title}</h3>
        <p className={styles.genres_list}>{genres}</p>
        <div className={styles.release_date}>{getYearFromDate(film.releaseDate)}</div>
      </div>
    </Link>
  );
};
