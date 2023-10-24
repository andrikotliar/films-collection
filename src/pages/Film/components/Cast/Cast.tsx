import classes from './Cast.module.css';
import { FC } from 'react';
import { CastType } from '@/common';
import { Actor } from '@/pages/Film/components/Cast/components';

type CastProps = {
  cast: CastType[];
};

const Cast: FC<CastProps> = ({ cast }) => {
  return (
    <div className={classes.cast}>
      {cast.map((actor) => (
        <Actor actor={actor} key={actor.actorId} />
      ))}
    </div>
  );
};

export { Cast };
