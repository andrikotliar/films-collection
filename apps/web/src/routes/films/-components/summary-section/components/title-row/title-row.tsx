import {
  Rating,
  Title,
  WatchCounterBadge,
} from '~/routes/films/-components/summary-section/components/title-row/components';
import styles from './title-row.module.css';
import { type FilmDetails } from '~/shared';

type TitleRowProps = {
  data: FilmDetails;
};

export const TitleRow = ({ data }: TitleRowProps) => {
  return (
    <div className={styles.title_row}>
      <Title>{data.title}</Title>
      <div className={styles.right_column}>
        {data.watchCounter && <WatchCounterBadge counters={data.watchCounter} />}
        <Rating value={data.rating} />
      </div>
    </div>
  );
};
