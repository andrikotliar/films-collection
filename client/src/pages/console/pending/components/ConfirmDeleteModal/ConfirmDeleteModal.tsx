import styles from './ConfirmDeleteModal.module.css';
import { Button, Modal } from '@/components';
import { FC } from 'react';

type ConfirmDeleteModalProps = {
  isOpen: boolean;
  onConfirm: VoidFunction;
  onClose: VoidFunction;
};

export const ConfirmDeleteModal: FC<ConfirmDeleteModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} className={styles.wrapper}>
      <Modal.Content className={styles.content}>
        <h2>Confirm delete film</h2>
        <div className={styles.buttons}>
          <Button onClick={onConfirm} variant="danger">
            Delete
          </Button>
          <Button onClick={onClose} variant="secondary">
            Cancel
          </Button>
        </div>
      </Modal.Content>
    </Modal>
  );
};
