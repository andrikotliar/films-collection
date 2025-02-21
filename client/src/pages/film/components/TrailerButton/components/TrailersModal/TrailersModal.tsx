import { Modal } from '@/ui';
import { FC } from 'react';
import { Video } from '../Video/Video';
import styles from './TrailersModal.module.css';

type TrailersModalProps = {
  isOpen: boolean;
  onClose: VoidFunction;
  trailerId: string;
};

export const TrailersModal: FC<TrailersModalProps> = ({
  isOpen,
  onClose,
  trailerId,
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} className={styles.trailersModal}>
      <Modal.Content className={styles.trailersModalContent}>
        <Video trailerId={trailerId} />
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
