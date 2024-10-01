import { SeriesExtension } from '@/types';
import { FC } from 'react';
import { TrailerButton } from '../trailer-button/TrailerButton';
import styles from './SeriesStatsSection.module.css';
import { TagLink } from '../tag-link/TagLink';
import { buildQueryLink } from '@/helpers';
import { Season } from './components';
import { ScrollableWrapper } from '@/components';

type SeriesStatsSectionProps = {
  data: SeriesExtension;
};

const SeriesStatsSection: FC<SeriesStatsSectionProps> = ({ data }) => {
  return (
    <div>
      <div className={styles.general}>
        <TagLink
          path={buildQueryLink({
            seasonsTotal: data.seasons.length,
          })}
          variant="blue"
        >
          Seasons Total: {data.seasons.length}
        </TagLink>
        <TagLink
          path={buildQueryLink({
            episodesTotal: data.episodesTotal,
          })}
          variant="blue"
        >
          Episodes Total: {data.episodesTotal}
        </TagLink>
      </div>
      <ScrollableWrapper className={styles.seasons}>
        {data.seasons.map((season) => (
          <Season data={season} key={season.number} />
        ))}
      </ScrollableWrapper>
    </div>
  );
};

export { SeriesStatsSection };
