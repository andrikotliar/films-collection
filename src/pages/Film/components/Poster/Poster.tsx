import classes from './Poster.module.css';
import { FC } from 'react';

type PosterProps = {
  poster: string;
  title: string;
};

const Poster: FC<PosterProps> = ({ poster, title }) => {
  return (
    <div className={classes.poster}>
      <img src={poster} alt={title} />
    </div>
  );
};

export { Poster };
