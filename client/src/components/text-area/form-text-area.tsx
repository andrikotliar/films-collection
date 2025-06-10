import { TextArea, TextAreaProps } from './text-area';
import { useFormContext } from 'react-hook-form';

type FormTextAreaProps = {
  name: string;
} & TextAreaProps;

export const FormTextArea = ({ name, ...props }: FormTextAreaProps) => {
  const { register, formState } = useFormContext();
  const { errors } = formState;

  return (
    <TextArea
      error={errors[name]?.message as string | undefined}
      {...register(name)}
      {...props}
    />
  );
};
