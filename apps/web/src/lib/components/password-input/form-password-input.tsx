import { useFormContext } from 'react-hook-form';
import { PasswordInput, type PasswordInputProps } from './password-input';
import type { FormFieldProps } from '~/lib/types';

export const FormPasswordInput = ({ name, ...props }: FormFieldProps<PasswordInputProps>) => {
  const { register, formState } = useFormContext();

  const { errors } = formState;

  return <PasswordInput {...register(name)} {...props} error={errors[name]?.message as string} />;
};
