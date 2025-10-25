import type { FormFieldProps } from '~/common/types';
import { AsyncSelect, type AsyncSelectProps } from './async-select';
import { Controller, useFormContext } from 'react-hook-form';

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
