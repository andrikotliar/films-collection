import { FilmData } from '@/common/types';
import { Media } from '@/pages/film/components/media/Media';
import { Summary } from '@/pages/film/components/summary/Summary';
import { FC } from 'react';
import styles from './TopRow.module.css';

type TopRowProps = {
  film: FilmData;
  activeIndex: number;
};

const TopRow: FC<TopRowProps> = ({ film, activeIndex }) => {
  return (
    <div className={styles.wrapper}>
      <Media media={film.media[activeIndex]} />
      <Summary film={film} activeIndex={activeIndex} />
    </div>
  );
};

export { TopRow };
