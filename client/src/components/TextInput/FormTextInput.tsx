import { FC } from 'react';
import { useFormContext } from 'react-hook-form';
import { TextInput, TextInputProps } from './TextInput';

type FormInputProps = {
  name: string;
} & TextInputProps;

export const FormTextInput: FC<FormInputProps> = ({ name, ...props }) => {
  const { register, formState } = useFormContext();

  const { errors } = formState;

  return (
    <TextInput
      error={errors[name]?.message as string}
      {...register(name)}
      {...props}
    />
  );
};
