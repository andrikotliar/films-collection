import { Modal } from '@/components';
import { PlayIcon } from 'lucide-react';
import { FC, useState } from 'react';
import styles from './TrailerButton.module.css';

type TrailerButtonProps = {
  trailer: string;
};

const TrailerButton: FC<TrailerButtonProps> = ({ trailer }) => {
  const [isTrailerOpen, setIsTrailerOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsTrailerOpen(true)}
        className={styles.playButton}
      >
        <PlayIcon className={styles.icon} />
        <span className={styles.label}>Play trailer</span>
      </button>
      <Modal
        isOpen={isTrailerOpen}
        onClose={() => setIsTrailerOpen(false)}
        contentClassName={styles.trailer}
        closeButtonClassName={styles.closeButton}
      >
        <div className={styles.videoWrapper}>
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${trailer}?rel=0&showinfo=0&autoplay=1`}
            allow="autoplay"
            allowFullScreen
          />
        </div>
      </Modal>
    </>
  );
};

export { TrailerButton };
