import { SeriesExtension } from '@/types';
import { FC } from 'react';
import styles from './SeriesStats.module.css';
import { TagLink } from '../TagLink';
import { buildQueryLink } from '@/helpers';
import { Season } from './components';
import { ScrollableWrapper } from '@/components';

type SeriesStatsProps = {
  data: SeriesExtension;
};

const SeriesStats: FC<SeriesStatsProps> = ({ data }) => {
  return (
    <div>
      <ScrollableWrapper className={styles.seasons}>
        {data.seasons.map((season) => (
          <Season data={season} key={season.number} />
        ))}
      </ScrollableWrapper>
      <div className={styles.general}>
        <TagLink
          path={buildQueryLink({
            seasonsTotal: data.seasons.length,
          })}
          variant="gray"
        >
          Seasons Total: {data.seasons.length}
        </TagLink>
        <TagLink
          path={buildQueryLink({
            episodesTotal: data.episodesTotal,
          })}
          variant="gray"
        >
          Episodes Total: {data.episodesTotal}
        </TagLink>
      </div>
    </div>
  );
};

export { SeriesStats };
