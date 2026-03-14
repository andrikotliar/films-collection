import type { FormError, FormFieldProps } from '~/shared/types';
import { Controller, useFormContext } from 'react-hook-form';
import { AsyncSelect, type AsyncSelectProps } from '~/shared/components/async-select/async-select';

export const FormAsyncSelect = ({
  name,
  error: errorProp,
  ...props
}: FormFieldProps<Omit<AsyncSelectProps, 'initialValue' | 'onSelect'>>) => {
  const { control, formState } = useFormContext();

  const error = errorProp ?? formState.errors[name]?.message;

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { value, onChange } }) => (
        <AsyncSelect value={value} onSelect={onChange} error={error as FormError} {...props} />
      )}
    />
  );
};
