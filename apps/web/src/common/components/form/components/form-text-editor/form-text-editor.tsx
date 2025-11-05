import { Controller, useFormContext } from 'react-hook-form';
import { TextEditor, type TextEditorProps } from '~/common/components/text-editor/text-editor';
import type { FormError, FormFieldProps } from '~/common/types';

export const FormTextEditor = ({
  name,
  ...props
}: FormFieldProps<Pick<TextEditorProps, 'label'>>) => {
  const { formState, control } = useFormContext();

  const error = formState.errors[name]?.message;

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, value } }) => (
        <TextEditor onChange={onChange} content={value} error={error as FormError} {...props} />
      )}
    />
  );
};
