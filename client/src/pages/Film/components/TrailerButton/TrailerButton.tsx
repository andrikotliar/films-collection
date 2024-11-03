import { Modal } from '@/components';
import { FC, useState } from 'react';
import styles from './TrailerButton.module.css';
import { PlayIcon } from 'lucide-react';

type TrailerButtonProps = {
  trailers: string[];
  title?: string;
};

const TrailerButton: FC<TrailerButtonProps> = ({ trailers }) => {
  const [isTrailerOpen, setIsTrailerOpen] = useState(false);
  const [selectedTrailerIndex, setSelectedTrailerIndex] = useState(0);

  const handleCloseTrailer = () => {
    setIsTrailerOpen(false);
  };

  return (
    <>
      <button
        onClick={() => setIsTrailerOpen(true)}
        className={styles.playButton}
        title="Play trailer"
      >
        <div className={styles.iconWrapper}>
          <PlayIcon size={18} className={styles.playIcon} />
        </div>
      </button>
      <Modal
        isOpen={isTrailerOpen}
        onClose={handleCloseTrailer}
        className={styles.trailerModal}
      >
        <Modal.Content className={styles.trailerModalContent}>
          <div className={styles.videoWrapper}>
            <iframe
              src={`https://www.youtube-nocookie.com/embed/${trailers[selectedTrailerIndex]}?rel=0&showinfo=0&autoplay=1`}
              allow="autoplay"
              allowFullScreen
            />
          </div>
          <Modal.CloseButton
            onClick={handleCloseTrailer}
            className={styles.trailerCloseButton}
          />
        </Modal.Content>
      </Modal>
    </>
  );
};

export { TrailerButton };
