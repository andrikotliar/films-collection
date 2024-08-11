import { MediaItem } from '@/common/types';
import { FC } from 'react';
import styles from './Poster.module.css';
import { buildMediaPath } from '@/helpers';

type PosterProps = {
  media: MediaItem;
  title: string;
};

const Poster: FC<PosterProps> = ({ media, title }) => {
  const posterUrl = buildMediaPath('posters', media.poster);

  return (
    <div className={styles.poster}>
      <img
        src={posterUrl}
        alt={`Poster of "${title}"`}
        className={styles.image}
      />
    </div>
  );
};

export { Poster };
