import type { FormFieldProps } from '~/common/types';
import { Select, type SelectProps } from './select';
import { Controller, useFormContext } from 'react-hook-form';

export const FormSelect = ({
  name,
  ...props
}: FormFieldProps<Omit<SelectProps, 'onSelect' | 'initialValue'>>) => {
  const { control } = useFormContext();

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { value, onChange } }) => (
        <Select onSelect={onChange} value={value} {...props} />
      )}
    />
  );
};
