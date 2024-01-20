import classes from './PosterImage.module.css';
import { FC } from 'react';
import { buildMediaPath } from '@/helpers';

type PosterImageProps = {
  src: string;
  title: string;
};

const PosterImage: FC<PosterImageProps> = ({ src, title }) => {
  const posterUrl = buildMediaPath('posters', src);

  return (
    <div className={classes.posterWrapper}>
      <img src={posterUrl} alt={title} className={classes.poster} />
    </div>
  );
};

export { PosterImage };
