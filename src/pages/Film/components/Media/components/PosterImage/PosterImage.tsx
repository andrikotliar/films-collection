import classes from './PosterImage.module.css';
import { FC } from 'react';
import { buildMediaPath } from '@/helpers';

type PosterImageProps = {
  src: string;
  alt?: string;
  caption?: string;
};

const PosterImage: FC<PosterImageProps> = ({ src, alt, caption }) => {
  const posterUrl = buildMediaPath('posters', src);

  return (
    <div className={classes.posterWrapper}>
      <img src={posterUrl} alt={alt} className={classes.poster} />
      {caption && <span className={classes.caption}>{caption}</span>}
    </div>
  );
};

export { PosterImage };
