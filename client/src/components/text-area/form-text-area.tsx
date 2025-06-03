import { FC } from 'react';
import { TextArea, TextAreaProps } from './text-area';
import { useFormContext } from 'react-hook-form';

type FormTextAreaProps = {
  name: string;
} & TextAreaProps;

export const FormTextArea: FC<FormTextAreaProps> = ({ name, ...props }) => {
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
