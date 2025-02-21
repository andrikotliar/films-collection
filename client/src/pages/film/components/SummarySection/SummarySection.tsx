import { FilmDetails } from '@/types';
import { FC, useMemo } from 'react';
import styles from './SummarySection.module.css';
import { Poster, Summary } from './components';
import { getFilmSummaryConfig } from '../../helpers';

type SummarySectionProps = {
  film: FilmDetails;
};

export const SummarySection: FC<SummarySectionProps> = ({ film }) => {
  const filmConfig = useMemo(() => {
    return getFilmSummaryConfig(film);
  }, [film]);

  return (
    <div className={styles.summaryLayout}>
      <Poster image={film.poster} title={film.title} />
      <Summary config={filmConfig} />
    </div>
  );
};
