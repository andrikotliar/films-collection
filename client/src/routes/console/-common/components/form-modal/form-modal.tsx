import { Modal } from '@/components';
import styles from './form-modal.module.css';
import type { FormComponentProps } from '@/common';

type FormModalProps<T extends Record<PropertyKey, unknown>> = {
  onClose: VoidFunction;
  values: T | null;
  form: (props: FormComponentProps<T>) => JSX.Element;
};

export const FormModal = <T extends Record<PropertyKey, unknown>>({
  values,
  onClose,
  form: FormComponent,
}: FormModalProps<T>) => {
  if (!values) {
    return null;
  }

  return (
    <Modal isOpen onClose={onClose} className={styles.wrapper}>
      <Modal.Content className={styles.content}>
        <FormComponent values={values} onParentModalClose={onClose} />
        <Modal.CloseButton onClick={onClose} className={styles.closeButton} />
      </Modal.Content>
    </Modal>
  );
};
