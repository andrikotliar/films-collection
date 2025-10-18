import { Modal, type Film, type FilmTrailer } from '~/common';
import styles from './trailers-modal.module.css';
import { Playlist } from '~/routes/films/-components/summary-section/components/trailers/components/trailers-modal/components';

type TrailersModalProps = {
  onClose: VoidFunction;
  isOpen: boolean;
  trailers: FilmTrailer[];
  type: Film['type'];
};

export const TrailersModal = ({ onClose, isOpen, trailers, type }: TrailersModalProps) => {
  const previewLabel = type === 'SERIES' ? 'Season' : 'Trailer #';

  return (
    <Modal isOpen={isOpen} onClose={onClose} className={styles.trailersModal}>
      <Modal.Content className={styles.trailersModalContent}>
        <Playlist trailers={trailers} previewLabel={previewLabel} />
        <Modal.CloseButton onClick={onClose} className={styles.trailerCloseButton} />
        <Modal.CloseButton onClick={onClose} className={styles.trailerCloseButton} />
      </Modal.Content>
    </Modal>
  );
};
