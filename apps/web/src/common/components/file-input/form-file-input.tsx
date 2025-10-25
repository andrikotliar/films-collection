import type { FormFieldProps } from '~/common';
import { type FileInputProps, FileInput } from './file-input';
import { Controller, useFormContext } from 'react-hook-form';

export const FormFileInput = ({
  name,
  ...props
}: FormFieldProps<Omit<FileInputProps, 'onChange' | 'defaultValue'>>) => {
  const { control } = useFormContext();
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <FileInput
          defaultValue={typeof value === 'string' ? value : null}
          onChange={onChange}
          onRemove={() => onChange(null)}
          error={error?.message}
          {...props}
        />
      )}
    />
  );
};
