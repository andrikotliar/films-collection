import { Controller, useFormContext } from 'react-hook-form';
import { FileInput, type FileInputProps } from '~/shared/components/file-input/file-input';
import type { FormFieldProps } from '~/shared/types';

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
