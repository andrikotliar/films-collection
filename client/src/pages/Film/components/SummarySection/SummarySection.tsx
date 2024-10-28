import { FilmData } from '@/types';
import { FC, useMemo } from 'react';
import styles from './SummarySection.module.css';
import { Poster, Summary } from './components';
import { getFilmSummaryConfig } from '../../helpers';
import { TrailerButton } from '../TrailerButton/TrailerButton';
import { PlayIcon } from 'lucide-react';

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
      <Summary config={filmConfig} />
    </div>
  );
};

export { SummarySection };
