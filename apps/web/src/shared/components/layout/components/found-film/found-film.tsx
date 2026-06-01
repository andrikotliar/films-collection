import styles from './found-film.module.css';
import { Link } from '@tanstack/react-router';
import { getExternalImageUrl, getYearFromDate, type api, type ApiResponse } from '~/shared';
import { Image } from '~/shared/components/image/image';

type FoundFilmProps = {
  film: ApiResponse<typeof api.films.search>[number];
  onFilmOpen: VoidFunction;
};

export const FoundFilm = ({ film, onFilmOpen }: FoundFilmProps) => {
  const genres = film.genres.map((genre) => genre.title).join(', ');

  return (
    <Link
      to={location.pathname}
      className={styles.film_link}
      onClick={onFilmOpen}
      search={(prev) => ({ ...prev, filmId: film.id })}
    >
      <div className={styles.poster_wrapper}>
        <Image src={getExternalImageUrl(film.poster)} alt={`Poster of the "${film.title}"`} />
      </div>
      <div className={styles.info_wrapper}>
        <h3 className={styles.film_title}>{film.title}</h3>
        <p className={styles.genres_list}>{genres}</p>
        <div className={styles.release_date}>{getYearFromDate(film.releaseDate)}</div>
      </div>
    </Link>
  );
};
