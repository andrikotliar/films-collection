import { FC } from 'react';
import { MediaItem } from '@/common/types';
import { buildMediaPath } from '@/helpers';
import styles from './Media.module.css';

type MediaProps = {
  media: MediaItem;
};

const Media: FC<MediaProps> = ({ media }) => {
  const posterUrl = buildMediaPath('posters', media.poster);

  return (
    <button onClick={() => {}} className={styles.posterButton}>
      <img src={posterUrl} className={styles.posterImage} />
    </button>
  );
};

export { Media };
