import { useQuery } from '@tanstack/react-query';
import { DataSection } from '~/routes/_home/-components/data-section/data-section';
import { getFormattedDate, getPluralWord, getUpcomingFilmQueryOptions } from '~/shared';
import styles from './upcoming-films-widget.module.css';

export const UpcomingFilmsWidget = () => {
  const { data = [], isLoading } = useQuery(getUpcomingFilmQueryOptions());
  return (
    <DataSection title="Upcoming films" isLoading={isLoading}>
      {data.map((film) => (
        <div key={film.id} className={styles.film}>
          <div className={styles.row}>
            <span>{film.title}</span>
            <span className={styles.date}>
              In {film.inDays} {getPluralWord('day', film.inDays)}
            </span>
          </div>
          <span className={styles.date}>{getFormattedDate(film.releaseDate)}</span>
        </div>
      ))}
    </DataSection>
  );
};
