import { Modal } from '@/components';
import styles from './form-modal.module.css';
import { ReactNode } from 'react';

type FormModalProps = {
  isOpen: boolean;
  onClose: VoidFunction;
  children?: ReactNode;
};

export const FormModal = ({ isOpen, onClose, children }: FormModalProps) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} className={styles.wrapper}>
      <Modal.Content className={styles.content}>
        {children}
        <Modal.CloseButton onClick={onClose} className={styles.closeButton} />
      </Modal.Content>
    </Modal>
  );
};
