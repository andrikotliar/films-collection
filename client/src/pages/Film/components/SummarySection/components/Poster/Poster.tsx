import { FC } from 'react';
import { buildMediaPath } from '@/helpers';
import styles from './Poster.module.css';

type MediaProps = {
  image: string;
  title: string;
};

const Poster: FC<MediaProps> = ({ image, title }) => {
  return (
    <div className={styles.poster}>
      <img
        src={buildMediaPath('posters', image)}
        alt={`Poster of "${title}"`}
        className={styles.image}
      />
    </div>
  );
};

export { Poster };
