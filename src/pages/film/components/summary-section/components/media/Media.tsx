import { FC, useState } from 'react';
import { buildMediaPath } from '@/helpers';
import { PlayIcon } from 'lucide-react';
import { MediaItem } from '@/common/types';
import { Modal } from '@/components';
import styles from './Media.module.css';

type MediaProps = {
  data: MediaItem;
  title: string;
};

const Media: FC<MediaProps> = ({ data, title }) => {
  const [isTrailerOpen, setIsTrailerOpen] = useState(false);

  return (
    <>
      <button onClick={() => setIsTrailerOpen(true)} className={styles.wrapper}>
        <div className={styles.playIconWrapper}>
          <PlayIcon className={styles.playButtonIcon} />
        </div>
        <div className={styles.poster}>
          <img
            src={buildMediaPath('posters', data.poster)}
            alt={`Media of "${title}"`}
            className={styles.image}
          />
        </div>
      </button>
      <Modal
        isOpen={isTrailerOpen}
        onClose={() => setIsTrailerOpen(false)}
        contentClassName={styles.trailer}
      >
        <div className={styles.videoWrapper}>
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${data.trailer}?rel=0&showinfo=0&autoplay=1`}
            allow="autoplay"
            allowFullScreen
          />
        </div>
      </Modal>
    </>
  );
};

export { Media };