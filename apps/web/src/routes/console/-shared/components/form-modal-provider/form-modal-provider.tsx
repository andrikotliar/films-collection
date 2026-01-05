import { useState, type PropsWithChildren } from 'react';
import { FormModal } from '~/routes/console/-shared/components/form-modal/form-modal';
import { FormModalContext } from '~/routes/console/-shared/context';
import type { FormComponentProps, Entity } from '~/shared';

type FormModalProviderProps<T extends Entity> = {
  form: (props: FormComponentProps<T>) => JSX.Element;
};

export const FormModalProvider = <T extends Entity>({
  children,
  form,
}: PropsWithChildren<FormModalProviderProps<T>>) => {
  const [data, setData] = useState<T | null>(null);

  const handleClose = () => {
    setData(null);
  };

  return (
    <FormModalContext.Provider
      value={{ onOpen: (values) => setData(values), onClose: handleClose }}
    >
      {children}
      <FormModal values={data} form={form} onClose={handleClose} />
    </FormModalContext.Provider>
  );
};
