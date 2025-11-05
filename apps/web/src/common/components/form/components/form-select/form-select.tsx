import type { FormFieldProps } from '~/common/types';
import { Controller, useFormContext } from 'react-hook-form';
import { Select, type SelectProps } from '~/common/components/select/select';

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
