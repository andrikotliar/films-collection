import { FilmData } from '@/common/types';
import { Media } from '@/pages/film/components/media/Media';
import { Summary } from '@/pages/film/components/summary/Summary';
import { FC } from 'react';
import styles from './SummarySection.module.css';
import { Title } from '../title/Title';

type SummarySectionProps = {
  film: FilmData;
  activeIndex: number;
};

const SummarySection: FC<SummarySectionProps> = ({ film, activeIndex }) => {
  return (
    <div className={styles.wrapper}>
      <Media media={film.media[activeIndex]} />
      <div className={styles.rightColumn}>
        <Title>{film.title}</Title>
        <Summary film={film} activeIndex={activeIndex} />
      </div>
    </div>
  );
};

export { SummarySection };
