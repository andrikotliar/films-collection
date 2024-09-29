import { SeriesExtension } from '@/types';
import { FC } from 'react';
import { TrailerButton } from '../trailer-button/TrailerButton';
import styles from './SeriesStatsSection.module.css';
import { TagLink } from '../tag-link/TagLink';
import { buildQueryLink } from '@/helpers';
import { Season } from './components';
import { Scrollable } from '@/components';

type SeriesStatsSectionProps = {
  data: SeriesExtension;
};

const SeriesStatsSection: FC<SeriesStatsSectionProps> = ({ data }) => {
  return (
    <div>
      <div className={styles.general}>
        <TagLink
          path={buildQueryLink({
            seasonsCount: data.seasons.length,
          })}
          variant="blue"
        >
          Seasons Count: {data.seasons.length}
        </TagLink>
        <TagLink
          path={buildQueryLink({
            seasonsCount: data.seasons.length,
          })}
          variant="blue"
        >
          Episodes Count: {data.episodesTotal}
        </TagLink>
      </div>
      <Scrollable className={styles.seasons}>
        {data.seasons.map((season) => (
          <Season data={season} key={season.number} />
        ))}
      </Scrollable>
    </div>
  );
};

export { SeriesStatsSection };
