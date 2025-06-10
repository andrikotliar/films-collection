import { Controller, useFormContext } from 'react-hook-form';
import { Toggle, ToggleProps } from './toggle';

type FormToggleProps = {
  name: string;
} & Pick<ToggleProps, 'title'>;

export const FormToggle = ({ name, ...props }: FormToggleProps) => {
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
