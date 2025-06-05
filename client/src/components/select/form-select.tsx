import { FC } from 'react';
import { Select, SelectProps } from './select';
import { Controller, useFormContext } from 'react-hook-form';

type FormSelectProps = {
  name: string;
} & Omit<SelectProps, 'onSelect' | 'initialValue'>;

export const FormSelect: FC<FormSelectProps> = ({ name, ...props }) => {
  const { control } = useFormContext();

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { value, onChange } }) => (
        <Select onSelect={onChange} initialValue={value} {...props} />
      )}
    />
  );
};
