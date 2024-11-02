import { FC } from 'react';
import { StatisticItem, Title } from './components';
import { FilmData } from '@/types';
import styles from './TitleRow.module.css';
import { EyeIcon, PlayIcon, StarIcon } from 'lucide-react';
import { buildQueryLink } from '@/helpers';
import { TrailerButton } from '../TrailerButton/TrailerButton';

type TitleRowProps = {
  data: FilmData;
};

const TitleRow: FC<TitleRowProps> = ({ data }) => {
  return (
    <div className={styles.titleRow}>
      <Title>{data.title}</Title>
      <div className={styles.stats}>
        {data.trailer && (
          <TrailerButton
            trailer={data.trailer}
            icon={<PlayIcon size={18} className={styles.playIcon} />}
            className={styles.trailerButton}
          />
        )}
        <StatisticItem
          icon={<StarIcon />}
          value={`${data.rating} / 3`}
          color={data.rating > 1 ? 'green' : 'yellow'}
          title="Rating"
          linkPath={buildQueryLink({ rating: data.rating })}
        />
        <StatisticItem
          icon={<EyeIcon />}
          value={data.watchCount}
          color="purple"
          title="Watch count"
          linkPath={buildQueryLink({ watchCount: data.watchCount })}
        />
      </div>
    </div>
  );
};

export { TitleRow };
