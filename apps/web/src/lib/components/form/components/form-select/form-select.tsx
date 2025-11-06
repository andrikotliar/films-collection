import type { FormFieldProps } from '~/lib/types';
import { Controller, useFormContext } from 'react-hook-form';
import { Select, type SelectProps } from '~/lib/components/select/select';

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
