import { useFormContext } from 'react-hook-form';
import { PasswordInput, PasswordInputProps } from './password-input';

type FormPasswordProps = {
  name: string;
} & PasswordInputProps;

export const FormPasswordInput = ({ name, ...props }: FormPasswordProps) => {
  const { register, formState } = useFormContext();

  const { errors } = formState;

  return (
    <PasswordInput
      {...register(name)}
      {...props}
      error={errors[name]?.message as string}
    />
  );
};
