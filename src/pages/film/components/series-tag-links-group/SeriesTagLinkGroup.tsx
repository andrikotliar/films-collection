import { FC } from 'react';
import styles from './SeriesTagLinkGroup.module.css';
import { TagLink } from '../tag-link/TagLink';
import { buildQueryLink } from '@/helpers';

type SeriesTagLinkGroupProps = {
  seasonsCount: number;
  episodesCount: number;
};

const SeriesTagLinkGroup: FC<SeriesTagLinkGroupProps> = ({
  seasonsCount,
  episodesCount,
}) => {
  return (
    <div className={styles.wrapper}>
      <TagLink path={buildQueryLink({ seasons: seasonsCount })} variant="mint">
        {seasonsCount} season
        {seasonsCount > 1 ? 's' : ''}
      </TagLink>
      <TagLink
        path={buildQueryLink({ episodes: episodesCount })}
        variant="mint"
      >
        {episodesCount} episode
        {episodesCount > 1 ? 's' : ''}
      </TagLink>
    </div>
  );
};

export { SeriesTagLinkGroup };
