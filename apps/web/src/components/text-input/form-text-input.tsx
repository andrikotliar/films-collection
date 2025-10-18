import { useFormContext } from 'react-hook-form';
import { TextInput, TextInputProps } from './text-input';

type FormInputProps = {
  name: string;
} & TextInputProps;

export const FormTextInput = ({ name, ...props }: FormInputProps) => {
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
