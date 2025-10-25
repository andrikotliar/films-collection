import type { FormFieldProps } from '~/common/types';
import { TextArea, type TextAreaProps } from './text-area';
import { useFormContext } from 'react-hook-form';

export const FormTextArea = ({ name, ...props }: FormFieldProps<TextAreaProps>) => {
  const { register, formState } = useFormContext();
  const { errors } = formState;

  return (
    <TextArea error={errors[name]?.message as string | undefined} {...register(name)} {...props} />
  );
};
