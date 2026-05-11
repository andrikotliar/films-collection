import styles from './form-modal.module.css';
import { type FormComponentProps, Modal, Panel } from '~/shared';

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
    <Modal isOpen onClose={onClose} isAllowedClickOutside={false}>
      <Modal.Content>
        <div className={styles.content}>
          <Panel>
            <FormComponent values={values} />
          </Panel>
        </div>
        <Modal.CloseButton onClick={onClose} />
      </Modal.Content>
    </Modal>
  );
};
