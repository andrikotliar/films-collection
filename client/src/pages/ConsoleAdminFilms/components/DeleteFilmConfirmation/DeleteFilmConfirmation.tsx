import styles from './DeleteFilmConfirmation.module.css';
import { FC } from 'react';
import { Modal } from '@/ui';
import { ConfirmationModalContent } from './components';

type DeleteFilmConfirmationProps = {
  title: string;
  isOpen: boolean;
  onClose: VoidFunction;
  onConfirm: VoidFunction;
};

export const DeleteFilmConfirmation: FC<DeleteFilmConfirmationProps> = ({
  title,
  isOpen,
  onClose,
  onConfirm,
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} className={styles.wrapper}>
      <Modal.Content className={styles.content}>
        <ConfirmationModalContent
          title={title}
          onClose={onClose}
          onConfirm={onConfirm}
        />
      </Modal.Content>
    </Modal>
  );
};
