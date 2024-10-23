import { SeriesExtension } from '@/types';
import { FC } from 'react';
import styles from './SeriesStats.module.css';
import { Season } from './components';
import { ScrollableWrapper } from '@/components';

type SeriesStatsProps = {
  data: SeriesExtension;
};

const SeriesStats: FC<SeriesStatsProps> = ({ data }) => {
  return (
    <ScrollableWrapper className={styles.seasons}>
      {data.seasons.map((season) => (
        <Season data={season} key={season.number} />
      ))}
    </ScrollableWrapper>
  );
};

export { SeriesStats };
