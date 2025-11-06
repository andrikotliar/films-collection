import { useFormContext } from 'react-hook-form';
import { TextInput, type TextInputProps } from '~/lib/components/text-input/text-input';
import type { FormFieldProps } from '~/lib/types';

export const FormTextInput = ({ name, ...props }: FormFieldProps<TextInputProps>) => {
  const { register, formState } = useFormContext();

  const { errors } = formState;

  return <TextInput error={errors[name]?.message as string} {...register(name)} {...props} />;
};
