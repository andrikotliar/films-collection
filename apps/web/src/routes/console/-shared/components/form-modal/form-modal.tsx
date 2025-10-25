import styles from './styles.module.css';
import { type FormComponentProps, Modal, Panel } from '~/common';

type FormModalProps<T extends Record<PropertyKey, unknown>> = {
  onClose: VoidFunction;
  afterSubmitEffect: FormComponentProps<T>['afterSubmitEffect'];
  values: T | null;
  form: (props: FormComponentProps<T>) => JSX.Element;
};

export const FormModal = <T extends Record<PropertyKey, unknown>>({
  values,
  onClose,
  afterSubmitEffect,
  form: FormComponent,
}: FormModalProps<T>) => {
  if (!values) {
    return null;
  }

  return (
    <Modal isOpen onClose={onClose} className={styles.wrapper} isAllowedClickOutside={false}>
      <Modal.Content className={styles.content}>
        <Panel>
          <FormComponent values={values} afterSubmitEffect={afterSubmitEffect} />
        </Panel>
        <Modal.CloseButton onClick={onClose} className={styles.close_button} />
      </Modal.Content>
    </Modal>
  );
};
