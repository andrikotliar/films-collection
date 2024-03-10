import styles from './PosterImage.module.css';
import { FC } from 'react';
import { buildMediaPath } from '@/helpers';

type Props = {
  src: string;
  alt?: string;
  caption?: string;
};

const PosterImage: FC<Props> = ({ src, alt, caption }) => {
  const posterUrl = buildMediaPath('posters', src);

  return (
    <div className={styles.posterWrapper}>
      <img src={posterUrl} alt={alt} className={styles.poster} />
      {caption && <span className={styles.caption}>{caption}</span>}
    </div>
  );
};

export { PosterImage };
