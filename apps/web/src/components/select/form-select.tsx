import { Select, SelectProps } from './select';
import { Controller, useFormContext } from 'react-hook-form';

type FormSelectProps = {
  name: string;
} & Omit<SelectProps, 'onSelect' | 'initialValue'>;

export const FormSelect = ({ name, ...props }: FormSelectProps) => {
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
