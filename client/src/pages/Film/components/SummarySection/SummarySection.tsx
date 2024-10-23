import { FilmData } from '@/types';
import { FC, useMemo } from 'react';
import styles from './SummarySection.module.css';
import { Title } from '../Title/Title';
import { Poster, Rating, Summary, WatchCount } from './components';
import { getFilmSummaryConfig } from '../../helpers';
import { TrailerButton } from '../TrailerButton/TrailerButton';

type SummarySectionProps = {
  film: FilmData;
};

const SummarySection: FC<SummarySectionProps> = ({ film }) => {
  const filmConfig = useMemo(() => {
    return getFilmSummaryConfig(film);
  }, [film]);

  return (
    <div className={styles.summaryLayout}>
      <Poster image={film.poster} title={film.title} />
      <div className={styles.summary}>
        <Title>{film.title}</Title>
        <Summary config={filmConfig} />
        <div className={styles.stats}>
          {film.trailer && (
            <div className={styles.trailerBlock}>
              <TrailerButton trailer={film.trailer} />
            </div>
          )}
          <Rating value={film.rating} />
          <WatchCount value={film.watchCount} />
        </div>
      </div>
    </div>
  );
};

export { SummarySection };
