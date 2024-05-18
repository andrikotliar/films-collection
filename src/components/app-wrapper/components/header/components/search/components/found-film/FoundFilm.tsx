import { FilmData } from '@/common/types';
import { buildMediaPath } from '@/helpers';
import { FC } from 'react';
import styles from './FoundFilm.module.css';
import { useLocation, useNavigate } from 'react-router-dom';

type FoundFilmProps = {
  film: FilmData;
  onFilmOpen: VoidFunction;
};

const FoundFilm: FC<FoundFilmProps> = ({ film, onFilmOpen }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const isDisabled = location.pathname.includes(film.id);

  const openFilmPage = () => {
    navigate(`/film/${film.id}`);
    onFilmOpen();
  };

  return (
    <button
      className={styles.film}
      onClick={openFilmPage}
      type="button"
      disabled={isDisabled}
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
    </button>
  );
};

export { FoundFilm };
