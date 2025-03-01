import { FC } from 'react';
import { Rating, Title } from './components';
import { FilmDetails } from '@/types';
import styles from './TitleRow.module.css';

type TitleRowProps = {
  data: FilmDetails;
};

export const TitleRow: FC<TitleRowProps> = ({ data }) => {
  return (
    <div className={styles.titleRow}>
      <Title>{data.title}</Title>
      <Rating value={data.rating} />
    </div>
  );
};
