import { FC } from 'react';
import { UrlInput, UrlInputProps } from './UrlInput';
import { useFormContext } from 'react-hook-form';

type FormUrlInputProps = {
  name: string;
} & Omit<UrlInputProps, 'url'>;

export const FormUrlInput: FC<FormUrlInputProps> = ({ name, ...props }) => {
  const { register, formState } = useFormContext();

  const { errors } = formState;

  return (
    <UrlInput
      error={errors[name]?.message as string}
      {...register(name)}
      {...props}
    />
  );
};
