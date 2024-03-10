import { FC, useState } from 'react';
import { MediaItem } from '@/common';
import { Controls, PosterImage } from './components';
import { TrailerButton } from '@/pages/Film/components/TrailerButton';

import styles from './Media.module.css';

type Props = {
  media: MediaItem[];
  title: string;
};

const Media: FC<Props> = ({ media, title }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <>
      <div className={styles.wrapper}>
        <div
          className={styles.track}
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
        {media.length > 1 && (
          <Controls itemsCount={media.length} setActiveIndex={setActiveIndex} />
        )}
      </div>
      <TrailerButton trailer={media[activeIndex].trailer} />
    </>
  );
};

export { Media };
