import classes from './FilmMedia.module.css';
import { FC, PropsWithChildren } from 'react';
import { Poster } from '@/pages/Film/components/Poster';
import { Trailer } from '@/pages/Film/components/Trailer';

type FilmMediaProps = {
  poster: string;
  title: string;
  trailer: string;
};

const FilmMedia: FC<PropsWithChildren<FilmMediaProps>> = ({
  title,
  trailer,
  poster,
  children,
}) => {
  return (
    <div className={classes.media}>
      {children}
      <Poster poster={poster} title={title} />
      <Trailer trailer={trailer} />
    </div>
  );
};

export { FilmMedia };
