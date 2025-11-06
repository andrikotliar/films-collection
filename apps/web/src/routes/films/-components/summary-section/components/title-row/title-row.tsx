import {
  Rating,
  Title,
  WatchCounterBadge,
} from '~/routes/films/-components/summary-section/components/title-row/components';
import styles from './styles.module.css';
import { type FilmDetails } from '~/lib';

type Props = {
  data: FilmDetails;
};

export const TitleRow = ({ data }: Props) => {
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
