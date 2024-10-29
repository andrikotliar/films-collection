import { FC, useState } from 'react';
import { PlayIcon } from 'lucide-react';
import { Modal } from '@/components';
import styles from './TrailerButton.module.css';

type TrailerButtonProps = {
  trailer: string;
};

const TrailerButton: FC<TrailerButtonProps> = ({ trailer }) => {
  const [isTrailerOpen, setIsTrailerOpen] = useState(false);

  const handleCloseTrailer = () => {
    setIsTrailerOpen(false);
  };

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
        onClose={handleCloseTrailer}
        className={styles.trailerModal}
      >
        <Modal.Content className={styles.trailerModalContent}>
          <div className={styles.videoWrapper}>
            <iframe
              src={`https://www.youtube-nocookie.com/embed/${trailer}?rel=0&showinfo=0&autoplay=1`}
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
