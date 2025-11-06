import type { FormFieldProps } from '~/lib/types';
import { useFormContext } from 'react-hook-form';
import { TextArea, type TextAreaProps } from '~/lib/components/text-area/text-area';

export const FormTextArea = ({ name, ...props }: FormFieldProps<TextAreaProps>) => {
  const { register, formState } = useFormContext();
  const { errors } = formState;

  return (
    <TextArea error={errors[name]?.message as string | undefined} {...register(name)} {...props} />
  );
};
