import { Controller, useFormContext } from 'react-hook-form';
import { TextEditor, type TextEditorProps } from '~/shared/components/text-editor/text-editor';
import type { FormError, FormFieldProps } from '~/shared/types';

export const FormTextEditor = ({
  name,
  ref,
  ...props
}: FormFieldProps<Pick<TextEditorProps, 'label' | 'menuOptions' | 'ref'>>) => {
  const { formState, control } = useFormContext();

  const error = formState.errors[name]?.message;

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, value } }) => (
        <TextEditor
          ref={ref}
          onChange={onChange}
          content={value}
          error={error as FormError}
          {...props}
        />
      )}
    />
  );
};
