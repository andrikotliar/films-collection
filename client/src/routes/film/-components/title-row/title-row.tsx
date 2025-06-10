import { Rating, Title } from './components';
import { FilmDetails } from '@/types';
import styles from './title-row.module.css';

type TitleRowProps = {
  data: FilmDetails;
};

export const TitleRow = ({ data }: TitleRowProps) => {
  return (
    <div className={styles.titleRow}>
      <Title>{data.title}</Title>
      <Rating value={data.rating} />
    </div>
  );
};
