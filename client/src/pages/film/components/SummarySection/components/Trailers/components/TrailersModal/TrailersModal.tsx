import { Modal } from '@/ui';
import { FC } from 'react';
import styles from './TrailersModal.module.css';
import { Season } from '@/types';
import { Trailers } from './components';

type TrailersModalProps = {
  onClose: VoidFunction;
  isOpen: boolean;
  trailerId: string | null;
  seasons: Season[];
};

export const TrailersModal: FC<TrailersModalProps> = ({
  onClose,
  isOpen,
  trailerId,
  seasons,
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} className={styles.trailersModal}>
      <Modal.Content className={styles.trailersModalContent}>
        <Trailers trailerId={trailerId} seasons={seasons} />
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
