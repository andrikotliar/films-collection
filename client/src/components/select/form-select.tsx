import { FC } from 'react';
import { Select, SelectProps } from './select';
import { Controller, useFormContext } from 'react-hook-form';

type FormSelectProps = {
  name: string;
} & Omit<SelectProps, 'onSelect' | 'defaultValue'>;

export const FormSelect: FC<FormSelectProps> = ({ name, ...props }) => {
  const { control } = useFormContext();

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, value } }) => (
        <Select onSelect={onChange} defaultValue={value} {...props} />
      )}
    />
  );
};
