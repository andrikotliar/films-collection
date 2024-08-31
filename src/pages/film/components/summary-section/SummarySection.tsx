import { FilmData } from '@/common/types';
import { act, FC, useMemo } from 'react';
import styles from './SummarySection.module.css';
import { Title } from '../title/Title';
import { BoxOffice, Media, Rating, Summary, WatchCount } from './components';
import { getFilmSummaryConfig } from '../../helpers';

type SummarySectionProps = {
  film: FilmData;
  activeIndex: number;
};

const SummarySection: FC<SummarySectionProps> = ({ film, activeIndex }) => {
  const filmConfig = useMemo(() => {
    return getFilmSummaryConfig(film, activeIndex);
  }, [film, activeIndex]);

  const isBoxOfficeBlockVisible = !!film.budget || !!film.boxOffice;

  return (
    <div className={styles.wrapper}>
      <Media data={film.media[activeIndex]} title={film.title} />
      <div className={styles.summary}>
        <Title>{film.title}</Title>
        <Summary config={filmConfig} />
        <div className={styles.stats}>
          <Rating value={film.rating} />
          <WatchCount value={film.watchCount} />
        </div>
        {!film.type.includes('Series') && isBoxOfficeBlockVisible && (
          <BoxOffice budget={film.budget} boxOffice={film.boxOffice} />
        )}
      </div>
    </div>
  );
};

export { SummarySection };
