import { FilmData } from '@/common/types';
import { Summary } from '@/pages/film/components/summary/Summary';
import { FC } from 'react';
import styles from './SummarySection.module.css';
import { Title } from '../title/Title';
import { Poster } from './components';

type SummarySectionProps = {
  film: FilmData;
  activeIndex: number;
};

const SummarySection: FC<SummarySectionProps> = ({ film, activeIndex }) => {
  return (
    <div className={styles.wrapper}>
      <Poster media={film.media[activeIndex]} title={film.title} />
      <div className={styles.rightColumn}>
        <Title>{film.title}</Title>
        <Summary film={film} activeIndex={activeIndex} />
      </div>
    </div>
  );
};

export { SummarySection };
