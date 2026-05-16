import { type FormComponentProps, Modal } from '~/shared';

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
      <Modal.Content size="form">
        <FormComponent values={values} />
        <Modal.CloseButton onClick={onClose} />
      </Modal.Content>
    </Modal>
  );
};
