import { FileInputProps, FileInput } from './file-input';
import { FC } from 'react';
import { Controller, useFormContext } from 'react-hook-form';

type FormFileInputProps = {
  name: string;
} & Omit<FileInputProps, 'onChange' | 'defaultValue'>;

export const FormFileInput: FC<FormFileInputProps> = ({ name, ...props }) => {
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
