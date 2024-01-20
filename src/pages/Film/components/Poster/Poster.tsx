import classes from './Poster.module.css';
import { FC, useState } from 'react';
import { MediaItem } from '@/common';
import { Controls, PosterImage } from './components';

type PosterProps = {
  media: MediaItem[];
  title: string;
};

const Poster: FC<PosterProps> = ({ media, title }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className={classes.posters}>
      <div
        className={classes.track}
        style={{
          transform: `translate(${-100 * activeIndex}%)`,
        }}
      >
        {media.map((item) => (
          <PosterImage src={item.poster} key={item.poster} title={title} />
        ))}
      </div>
      {media.length > 1 && (
        <Controls
          itemsCount={media.length}
          setActiveIndex={setActiveIndex}
          caption={media[activeIndex].caption}
        />
      )}
    </div>
  );
};

export { Poster };
