import styles from './ConfirmModal.module.css';
import { Button, ButtonVariant, Modal } from '@/ui';

type ConfirmModalProps<T extends Record<string, unknown>> = {
  title?: string;
  data: T | null;
  onConfirm: (data: T) => void;
  onClose: VoidFunction;
  confirmButtonTitle?: string;
  cancelButtonTitle?: string;
  confirmButtonVariant?: ButtonVariant;
  isPending?: boolean;
};

export const ConfirmModal = <T extends Record<string, unknown>>({
  title = 'Confirm deleting',
  data,
  onClose,
  onConfirm,
  confirmButtonTitle = 'Confirm',
  cancelButtonTitle = 'Cancel',
  confirmButtonVariant = 'primary',
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
