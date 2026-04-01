import { forwardRef } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import {
  TextEditor,
  type EditorRef,
  type TextEditorProps,
} from '~/shared/components/text-editor/text-editor';
import type { FormError, FormFieldProps } from '~/shared/types';

export const FormTextEditor = forwardRef<EditorRef, FormFieldProps<Pick<TextEditorProps, 'label'>>>(
  ({ name, ...props }, ref) => {
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
  },
);
