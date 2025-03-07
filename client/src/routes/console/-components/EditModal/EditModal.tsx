import { FC, PropsWithChildren } from 'react';
import { Modal } from '@/ui';
import styles from './EditModal.module.css';

type EditModalProps = PropsWithChildren<{
  isOpen: boolean;
  onClose: VoidFunction;
}>;

export const EditModal: FC<EditModalProps> = ({
  isOpen,
  onClose,
  children,
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} className={styles.wrapper}>
      <Modal.Content>
        {children}
        <Modal.CloseButton onClick={onClose} className={styles.closeButton} />
      </Modal.Content>
    </Modal>
  );
};
