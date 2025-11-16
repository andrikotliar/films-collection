import type { FormFieldProps } from '~/shared/types';
import { Controller, useFormContext } from 'react-hook-form';
import { AsyncSelect, type AsyncSelectProps } from '~/shared/components/async-select/async-select';

export const FormAsyncSelect = ({
  name,
  ...props
}: FormFieldProps<Omit<AsyncSelectProps, 'initialValue' | 'onSelect'>>) => {
  const { control } = useFormContext();

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { value, onChange } }) => (
        <AsyncSelect value={value} onSelect={onChange} {...props} />
      )}
    />
  );
};
