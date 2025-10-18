import styles from './confirm-modal.module.css';
import { Button, type ButtonVariant, Modal } from '@/components';

type ConfirmModalProps<T> = {
  title?: string;
  description?: string;
  data: T | null;
  onConfirm: (data: T) => void;
  onClose: VoidFunction;
  confirmButtonTitle?: string;
  cancelButtonTitle?: string;
  confirmButtonVariant?: ButtonVariant;
  isPending?: boolean;
};

export const ConfirmModal = <T,>({
  title = 'Confirm deleting',
  description,
  data,
  onClose,
  onConfirm,
  confirmButtonTitle = 'Confirm',
  cancelButtonTitle = 'Cancel',
  confirmButtonVariant = 'danger',
  isPending = false,
}: ConfirmModalProps<T>) => {
  const isOpen = data !== null;

  if (!isOpen) {
    return null;
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} className={styles.wrapper}>
      <Modal.Content className={styles.content}>
        <h2 className={styles.title}>{title}</h2>
        {description && <p className={styles.description}>{description}</p>}
        <div className={styles.buttons}>
          <Button
            onClick={() => onConfirm(data)}
            variant={confirmButtonVariant}
            isDisabled={isPending}
          >
            {confirmButtonTitle}
          </Button>
          <Button onClick={onClose} variant="secondary">
            {cancelButtonTitle}
          </Button>
        </div>
      </Modal.Content>
    </Modal>
  );
};
