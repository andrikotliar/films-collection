import type { FormError, FormFieldProps } from '~/shared/types';
import { Controller, useFormContext } from 'react-hook-form';
import { Select, type SelectProps } from '~/shared/components/select/select';

export const FormSelect = ({
  name,
  error: errorProp,
  ...props
}: FormFieldProps<Omit<SelectProps, 'onSelect' | 'initialValue'>>) => {
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
