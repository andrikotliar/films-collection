import { FormModalProvider } from '~/routes/console/-shared/components/form-modal-provider/form-modal-provider';
import type { FormComponentProps, Entity, Component } from '~/shared';

export const withFormModal = <T extends Entity, C extends Component<any>>(
  form: Component<FormComponentProps<T>>,
  WrapperComponent: C,
) => {
  return (props: any) => (
    <FormModalProvider form={form}>
      <WrapperComponent {...props} />
    </FormModalProvider>
  );
};
