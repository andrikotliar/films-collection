import {
  getExternalImageUrl,
  getPluralWord,
  getYearFromDate,
  Image,
  type api,
  type ApiResponse,
} from '~/shared';
import styles from './films-grid.module.css';
import { Link } from '@tanstack/react-router';
import { FilmsNotFound } from '~/routes/_home/-components/films-section/components/films-not-found/films-not-found';
import { PlayIcon } from 'lucide-react';
import { useState } from 'react';
import { TrailerWindow } from '~/routes/_home/-components/films-section/components/trailer-window/trailer-window';

type FilmsGridProps = {
  films: ApiResponse<typeof api.films.getList.exec>['list'];
};

export const FilmsGrid = ({ films }: FilmsGridProps) => {
  const [selectedFilmId, setSelectedFilmId] = useState<number | null>(null);
  if (!films.length) {
    return <FilmsNotFound />;
  }

  return (
    <div className={styles.grid}>
      {films.map((film) => (
        <Link
          className={styles.film_link}
          to="/films/$id"
          params={{ id: String(film.id) }}
          key={film.id}
          disabled={film.upcoming}
        >
          <div className={styles.cover}>
            {film.upcoming && <div className={styles.upcoming}>Upcoming</div>}
            <Image src={getExternalImageUrl(film.poster)} alt={film.title} />
            {film.upcoming && (
              <button className={styles.play_button} onClick={() => setSelectedFilmId(film.id)}>
                <PlayIcon />
              </button>
            )}
          </div>
          <h3 className={styles.title}>{film.title}</h3>
          <p className={styles.year}>
            {film.inDays
              ? `In ${film.inDays} ${getPluralWord('day', film.inDays)}`
              : getYearFromDate(film.releaseDate)}
          </p>
        </Link>
      ))}
      <TrailerWindow filmId={selectedFilmId} onClose={() => setSelectedFilmId(null)} />
    </div>
  );
};
