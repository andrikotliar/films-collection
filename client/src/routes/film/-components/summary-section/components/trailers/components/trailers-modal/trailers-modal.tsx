import { Modal } from '@/components';
import { FC } from 'react';
import styles from './trailers-modal.module.css';
import { Film, FilmTrailer } from '@/types';
import { Playlist } from './components';

type TrailersModalProps = {
  onClose: VoidFunction;
  isOpen: boolean;
  trailers: FilmTrailer[];
  type: Film['type'];
};

export const TrailersModal: FC<TrailersModalProps> = ({
  onClose,
  isOpen,
  trailers,
  type,
}) => {
  const previewLabel = type === 'SERIES' ? 'Season' : 'Trailer #';

  return (
    <Modal isOpen={isOpen} onClose={onClose} className={styles.trailersModal}>
      <Modal.Content className={styles.trailersModalContent}>
        <Playlist trailers={trailers} previewLabel={previewLabel} />
        <Modal.CloseButton
          onClick={onClose}
          className={styles.trailerCloseButton}
        />
        <Modal.CloseButton
          onClick={onClose}
          className={styles.trailerCloseButton}
        />
      </Modal.Content>
    </Modal>
  );
};
