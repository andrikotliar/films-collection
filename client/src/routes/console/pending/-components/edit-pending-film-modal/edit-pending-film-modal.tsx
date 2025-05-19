import { Modal } from '@/components';
import { PendingFilm } from '@/types';
import { FC } from 'react';
import { EditPendingFilmForm } from '../edit-pending-film-form/edit-pending-film-form';
import styles from './edit-pending-film-modal.module.css';

type EditPendingFilmFormModalProps = {
  onClose: VoidFunction;
  defaultValues: PendingFilm | null;
  refetch: VoidFunction;
};

export const EditPendingFilmModal: FC<EditPendingFilmFormModalProps> = ({
  onClose,
  defaultValues,
  refetch,
}) => {
  return (
    <Modal
      isOpen={defaultValues !== null}
      onClose={onClose}
      className={styles.wrapper}
    >
      <Modal.Content className={styles.content}>
        {defaultValues && (
          <EditPendingFilmForm
            defaultValues={defaultValues}
            onSubmitSuccess={() => {
              refetch();
              onClose();
            }}
          />
        )}
        <Modal.CloseButton onClick={onClose} className={styles.closeButton} />
      </Modal.Content>
    </Modal>
  );
};
