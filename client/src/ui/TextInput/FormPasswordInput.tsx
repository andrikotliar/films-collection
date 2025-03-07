import { FC } from 'react';
import { useFormContext } from 'react-hook-form';
import { PasswordInput, PasswordInputProps } from './PasswordInput';

type FormPasswordProps = {
  name: string;
} & PasswordInputProps;

export const FormPasswordInput: FC<FormPasswordProps> = ({
  name,
  ...props
}) => {
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
