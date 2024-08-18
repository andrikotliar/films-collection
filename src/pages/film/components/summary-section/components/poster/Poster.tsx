import { FC } from 'react';
import styles from './Poster.module.css';
import { buildMediaPath } from '@/helpers';

type PosterProps = {
  posterUrl: string;
  title: string;
};

const Poster: FC<PosterProps> = ({ posterUrl, title }) => {
  return (
    <div className={styles.poster}>
      <img
        src={buildMediaPath('posters', posterUrl)}
        alt={`Poster of "${title}"`}
        className={styles.image}
      />
    </div>
  );
};

export { Poster };
