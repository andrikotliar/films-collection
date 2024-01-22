import classes from './Media.module.css';
import { FC, useState } from 'react';
import { MediaItem } from '@/common';
import { Controls, PosterImage } from './components';
import { TrailerButton } from '@/pages/Film/components/TrailerButton';

type Props = {
  media: MediaItem[];
  title: string;
};

const Media: FC<Props> = ({ media, title }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className={classes.wrapper}>
      <div
        className={classes.track}
        style={{
          transform: `translate(${-100 * activeIndex}%)`,
        }}
      >
        {media.map((item) => (
          <PosterImage
            src={item.poster}
            key={item.poster}
            alt={title}
            caption={item.caption}
          />
        ))}
      </div>
      <TrailerButton trailer={media[activeIndex].trailer} />

      {media.length > 1 && (
        <Controls itemsCount={media.length} setActiveIndex={setActiveIndex} />
      )}
    </div>
  );
};

export { Media };
