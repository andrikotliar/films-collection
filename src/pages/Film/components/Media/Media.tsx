import classes from './Media.module.css';
import { FC } from 'react';
import { Poster } from '@/pages/Film/components/Poster';
import { Trailer } from '@/pages/Film/components/Trailer';

type MediaProps = {
  posters: string[];
  title: string;
  trailers: string[];
  activeIndex: number;
};

const Media: FC<MediaProps> = ({
  posters,
  title,
  trailers,
  activeIndex,
}) => {
  return (
    <div className={classes.media}>
      <Poster poster={posters[activeIndex]} title={title} />
      <Trailer trailer={trailers[activeIndex]} />
    </div>
  );
};

export { Media };
