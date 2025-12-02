import { Controller, useFormContext } from 'react-hook-form';
import { Toggle, type ToggleProps } from '~/shared/components/toggle/toggle';
import type { FormFieldProps } from '~/shared/types';

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
