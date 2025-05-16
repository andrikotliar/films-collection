import { FC } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { Toggle, ToggleProps } from './Toggle';

type FormToggleProps = {
  name: string;
} & Pick<ToggleProps, 'title'>;

export const FormToggle: FC<FormToggleProps> = ({ name, ...props }) => {
  const { control } = useFormContext();

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, value } }) => (
        <Toggle value={value} onToggle={onChange} {...props} />
      )}
    />
  );
};
