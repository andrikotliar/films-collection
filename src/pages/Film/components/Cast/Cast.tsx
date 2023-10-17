import classes from './Cast.module.css';
import { FC } from 'react';
import { CastType } from '@/common';
import { Actor } from '@/pages/Film/components/Cast/components';
import { TMDBLogo } from '@/assets/logos';

type CastProps = {
  cast: CastType[];
};

const Cast: FC<CastProps> = ({ cast }) => {
  return (
    <div className={classes.wrapper}>
      <div className={classes.cast}>
        {cast.map((actor) => (
          <Actor actor={actor} key={actor.actorId} />
        ))}
      </div>
      <div className={classes.castFooter}>
        <span>Actor photos provided by</span>
        <a
          href="https://www.themoviedb.org"
          target="_blank"
          rel="noopener noreferrer"
          className={classes.photosSource}
        >
          <TMDBLogo />
        </a>
      </div>
    </div>
  );
};

export { Cast };
