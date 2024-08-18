import { FilmData } from '@/common/types';
import { FC, useMemo } from 'react';
import styles from './SummarySection.module.css';
import { Title } from '../title/Title';
import {
  Poster,
  Rating,
  Summary,
  TrailerButton,
  WatchCount,
} from './components';
import { getFilmSummaryConfig } from '../../helpers';

type SummarySectionProps = {
  film: FilmData;
  activeIndex: number;
};

const SummarySection: FC<SummarySectionProps> = ({ film, activeIndex }) => {
  const filmConfig = useMemo(() => {
    return getFilmSummaryConfig(film, activeIndex);
  }, [film, activeIndex]);

  return (
    <div className={styles.wrapper}>
      <Poster posterUrl={film.media[activeIndex].poster} title={film.title} />
      <div className={styles.rightColumn}>
        <Title>{film.title}</Title>
        <Summary config={filmConfig} />
        <div className={styles.footer}>
          <TrailerButton trailer={film.media[activeIndex].trailer} />
          <Rating value={film.rating} />
          <WatchCount value={film.watchCount} />
        </div>
      </div>
    </div>
  );
};

export { SummarySection };
