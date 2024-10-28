import { FC } from 'react';
import { StatisticItem, Title } from './components';
import { FilmData } from '@/types';
import styles from './TitleRow.module.css';
import { EyeIcon, StarIcon } from 'lucide-react';
import { buildQueryLink } from '@/helpers';

type TitleRowProps = {
  data: FilmData;
};

const TitleRow: FC<TitleRowProps> = ({ data }) => {
  return (
    <div className={styles.titleRow}>
      <Title>{data.title}</Title>
      <div className={styles.stats}>
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
