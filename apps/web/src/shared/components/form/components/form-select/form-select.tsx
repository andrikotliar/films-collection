import type { FormError, FormFieldProps } from '~/shared/types';
import { Controller, useFormContext } from 'react-hook-form';
import { Select, type SelectProps } from '~/shared/components/select/select';
import type { ListOption } from '@films-collection/shared';

export const FormSelect = <T extends ListOption<any>>({
  name,
  error: errorProp,
  ...props
}: FormFieldProps<Omit<SelectProps<T>, 'onSelect' | 'initialValue'>>) => {
  const { control, formState } = useFormContext();

  const { errors } = formState;

  const error = errorProp ?? errors[name]?.message;

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { value, onChange } }) => (
        <Select onSelect={onChange} value={value} error={error as FormError} {...props} />
      )}
    />
  );
};
