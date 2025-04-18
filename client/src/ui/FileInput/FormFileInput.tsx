import { FileInputProps, FileInput } from '@/ui/FileInput/FileInput';
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
      render={({ field: { onChange, value } }) => (
        <FileInput
          defaultValue={typeof value === 'string' ? value : null}
          onChange={onChange}
          {...props}
        />
      )}
    />
  );
};
