import classes from './Media.module.css';
import { FC, useState } from 'react';
import { MediaItem } from '@/common';
import {
  Controls,
  Poster,
  Video,
} from '@/pages/Film/components/Media/components';
import { Modal } from '@/components';

type MediaProps = {
  media: MediaItem[];
  title: string;
};

const Media: FC<MediaProps> = ({ media, title }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <>
      <div className={classes.media}>
        <div
          className={classes.track}
          style={{
            transform: `translate(${-100 * activeIndex}%)`,
          }}
        >
          {media.map((item) => (
            <Poster
              poster={item.poster}
              caption={item.caption}
              setIsModalOpen={setIsModalOpen}
              key={item.poster}
              title={title}
            />
          ))}
        </div>
        {/* {media.length > 1 && ( */}
        <Controls
          activeIndex={activeIndex}
          setActiveIndex={setActiveIndex}
          media={media}
        />
        {/* // )} */}
        <Modal
          isOpen={isModalOpen}
          close={() => setIsModalOpen(false)}
          contentClassName={classes.modalContent}
        >
          <Video path={media[activeIndex].trailer} />
        </Modal>
      </div>
    </>
  );
};

export { Media };
