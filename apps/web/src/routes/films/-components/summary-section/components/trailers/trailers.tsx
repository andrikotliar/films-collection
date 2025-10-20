import styles from './styles.module.css';
import { Modal, type Film, type FilmTrailer } from '~/common';
import { useState } from 'react';
import { PlayIcon } from 'lucide-react';
import { TrailersPlaylist } from '~/routes/films/-components/summary-section/components/trailers/components';

type TrailersProps = {
  data: FilmTrailer[];
  type: Film['type'];
};

export const Trailers = ({ data, type }: TrailersProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (!data.length) {
    return null;
  }

  const handleClose = () => {
    setIsModalOpen(false);
  };

  const previewLabel = type === 'SERIES' ? 'Season' : 'Trailer #';

  return (
    <div className={styles.trailers}>
      <button
        className={styles.playButton}
        title="Play trailer"
        onClick={() => setIsModalOpen(true)}
      >
        <PlayIcon className={styles.playIcon} />
        <span className={styles.label}>Play trailer{data.length > 1 && 's'}</span>
      </button>
      <Modal isOpen={isModalOpen} onClose={handleClose} className={styles.trailersModal}>
        <Modal.Content className={styles.trailersModalContent}>
          <TrailersPlaylist trailers={data} previewLabel={previewLabel} />
          <Modal.CloseButton onClick={handleClose} className={styles.trailerCloseButton} />
          <Modal.CloseButton onClick={handleClose} className={styles.trailerCloseButton} />
        </Modal.Content>
      </Modal>
    </div>
  );
};
