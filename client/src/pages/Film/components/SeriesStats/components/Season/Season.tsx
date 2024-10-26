import { SeasonType } from '@/types';
import { FC } from 'react';
import { TrailerButton } from '@/pages/Film/components/TrailerButton/TrailerButton';
import styles from './Season.module.css';
import { getFormattedDate } from '@/helpers';

type SeasonProps = {
  data: SeasonType;
};

const Season: FC<SeasonProps> = ({ data }) => {
  return (
    <div className={styles.season}>
      <div className={styles.title}>{data.title}</div>
      <div className={styles.body}>
        <div className={styles.data}>
          <span>Episodes:</span> {data.episodesCount}
        </div>
        <div className={styles.data}>
          <span>Release date:</span>
          {getFormattedDate(new Date(data.releaseDate))}
        </div>
      </div>
      <div className={styles.trailer}>
        <TrailerButton trailer={data.trailer} />
      </div>
    </div>
  );
};

export { Season };
