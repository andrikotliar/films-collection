import { FC } from 'react';
import { StatisticItem, Title } from './components';
import { FilmData } from '@/types';
import styles from './TitleRow.module.css';
import { EyeIcon, StarIcon } from 'lucide-react';
import { TrailerButton } from '../TrailerButton/TrailerButton';

type TitleRowProps = {
  data: FilmData;
};

export const TitleRow: FC<TitleRowProps> = ({ data }) => {
  return (
    <div className={styles.titleRow}>
      <Title>{data.title}</Title>
      <div className={styles.stats}>
        {data.trailers.length !== 0 && (
          <TrailerButton trailers={data.trailers} title="Play Trailer" />
        )}
        <StatisticItem
          icon={<StarIcon />}
          value={`${data.rating} / 3`}
          color={data.rating > 1 ? 'green' : 'yellow'}
          title="Rating"
          route="/"
          searchParams={{ rating: data.rating }}
        />
        <StatisticItem
          icon={<EyeIcon />}
          value={data.watchCount}
          color="purple"
          title="Watch count"
          route="/"
          searchParams={{ watchCount: data.watchCount }}
        />
      </div>
    </div>
  );
};
