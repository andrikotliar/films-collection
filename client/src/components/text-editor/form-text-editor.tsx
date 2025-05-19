import { FC } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { TextEditor, TextEditorProps } from './text-editor';
import { FormError } from '@/types';

type FormTextEditorProps = {
  name: string;
} & Pick<TextEditorProps, 'label'>;

export const FormTextEditor: FC<FormTextEditorProps> = ({ name, ...props }) => {
  const { formState, control } = useFormContext();

  const error = formState.errors[name]?.message;

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, value } }) => (
        <TextEditor
          onChange={onChange}
          content={value}
          error={error as FormError}
          {...props}
        />
      )}
    />
  );
};
