import { FC } from 'react';
import { buildMediaPath } from '@/helpers';

import styles from './PosterImage.module.css';

type PosterImageProps = {
  src: string;
  alt?: string;
};

const PosterImage: FC<PosterImageProps> = ({ src, alt }) => {
  const posterUrl = buildMediaPath('posters', src);

  return (
    <div className={styles.posterWrapper}>
      <img src={posterUrl} alt={alt} className={styles.poster} />
    </div>
  );
};

export { PosterImage };
