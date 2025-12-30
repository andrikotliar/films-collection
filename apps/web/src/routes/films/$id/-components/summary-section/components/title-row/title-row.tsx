import {
  Rating,
  Title,
  WatchCounterBadge,
} from '~/routes/films/$id/-components/summary-section/components/title-row/components';
import styles from './title-row.module.css';
import type { api, ApiResponse } from '~/shared';

type TitleRowProps = {
  data: ApiResponse<typeof api.films.get>;
};

export const TitleRow = ({ data }: TitleRowProps) => {
  return (
    <div className={styles.title_row}>
      <Title>{data.title}</Title>
      <div className={styles.right_column}>
        {data.watchCounter && (
          <WatchCounterBadge
            realCounter={data.watchCounter.realCounter || 0}
            approxCounter={data.watchCounter.approxCounter || 0}
          />
        )}
        <Rating value={data.rating} />
      </div>
    </div>
  );
};
