import { Controller, useFormContext } from 'react-hook-form';
import { Toggle, type ToggleProps } from '~/lib/components/toggle/toggle';
import type { FormFieldProps } from '~/lib/types';

export const FormToggle = ({ name, ...props }: FormFieldProps<Pick<ToggleProps, 'title'>>) => {
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
